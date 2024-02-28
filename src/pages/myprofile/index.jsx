import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Header from '../../components/Header';
import Return from '../../components/Return';
import ProductCard from '../../components/ProductCard';
import user from '../../img/main_img/photo_user.png';
import { useNavigate } from 'react-router-dom';
import { getAllAds, getMyProfile, setUpdateUser, uploadUserPhoto } from '../../api';

export const Myprofile = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  // Хранение массива продуктов
  const [products, setProducts] = useState([]);
  // Хранение юзера
  const [users, setUsers] = useState([]);
  // Стейт для хранения ошибок
  const [error, setError] = useState('');

  // Проверка авторизации
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  // Получение токена и получение данных на странице профиля получение объявлений по id
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        // Получение токена + получение профиля юзера
        const userProfile = await getMyProfile();
        console.log(userProfile);
        setUsers(userProfile);
        // Получение всех объявлений
        const allAdsData = await getAllAds();
        console.log(allAdsData);
        const filteredProducts = allAdsData.filter(product => product.user.id === Number(userProfile.id));
        setProducts(filteredProducts);
      } catch (error) {
        console.error(error);
        setError('Произошла ошибка: ' + error.message);
      }
    };
  
    fetchData();
  }, []);
  // Обновление данных юзера
  const updateUserInfo = () => {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const role = 'user';
    const email = users.email;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const phonePattern = /^(\+\d{1,3})?\d{10}$/;
    const errors = [];
    switch(true) {
      case !name:
        errors.push('Введите имя!');
        nameInput.style.borderColor = '#f56a6aaa';
        break;
      case !phone.match(phonePattern):
        errors.push('Введите корректный номер телефона!');
        phoneInput.style.borderColor = '#f56a6aaa';
        break;
      default:
        setError('');
        nameInput.style.borderColor = '';
        phoneInput.style.borderColor = '';
        setUpdateUser({ role, email, name, surname, phone, city })
        .then(() => {
          return getMyProfile();
        })
          .catch((error) => {
            console.error(error);
            setError('Произошла ошибка: ' + error.message);
          });
    }
  };
  // Обновление фото юзера
  const updatePhotoUser = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      await uploadUserPhoto(formData);
      // После успешной загрузки изображения, обновляем информацию о профиле
      const userProfile = await getMyProfile();
      setUsers(userProfile);
    }
  };
  // Функция для обновления страницы после добавления нового объявления
const fetchAndUpdateProducts = async () => {
  try {
    const userProfile = await getMyProfile();
    console.log(userProfile);
    setUsers(userProfile);
    // Получение всех объявлений
    const allAdsData = await getAllAds();
    console.log(allAdsData);
    const filteredProducts = allAdsData.filter(product => product.user.id === Number(userProfile.id));
    setProducts(filteredProducts);
  } catch (error) {
    console.error(error);
    setError('Произошла ошибка: ' + error.message);
  }
};
    return (
      <div>
     <Header onAddNewAd={fetchAndUpdateProducts} />
      <div className={styles.conteiners}>
        <Return />
          <div key={users.id} className={styles.main__container}>
          <div className={styles.main__h2}>Здравствуйте, {users.name}!</div>
          <span className={styles.main__h3}>Настройка профиля</span>
          <div className={styles.main__container_profile}>
                    <div className={styles.main__container_profile_img}>
                    {users.avatar ? (
                      <img className={styles.main__container_img} src={`http://localhost:8090/${users.avatar}`} alt='photo user'/>
                    ) : (
                      <img className={styles.main__container_img} src={user} alt='photo user'/>
                    )}
                    <label htmlFor="fileInput" className={styles.customFileInput}>
                      Заменить
                    </label>
                    <input type="file" id="fileInput" accept="image/*" onChange={updatePhotoUser} className={styles.inputFile} />
                    </div>
                    <div className={styles.main__container_user}>
                      <div className={styles.main__container_info_user}>
                        <div className={styles.main__container_name}>
                          <span>Имя</span>
                          <input 
                            id='name'
                            value={users.name}
                            className={styles.main__name_input}
                            onChange={(e) => setUsers({...users, name: e.target.value})}
                          />
                        </div>
                        <div className={styles.main__container_name}>
                          <span>Фамилия</span>
                          <input 
                            id='surname'
                            value={users.surname} 
                            className={styles.main__name_input} 
                            onChange={(e) => setUsers({...users, surname: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className={styles.main__container_name}>
                        <span>Город</span>
                        <input 
                            id='city'
                            value={users.city}
                            className={styles.main__name_input}
                            onChange={(e) => setUsers({...users, city: e.target.value})}
                          />
                      </div>
                      <div className={styles.main__container_name}>
                        <span>Телефон</span>
                        <input 
                            id='phone'
                            value={users.phone}
                            className={styles.main__name_input}
                            onChange={(e) => setUsers({...users, phone: e.target.value})}
                          />
                      </div>
                      <button type='button' onClick={updateUserInfo} className={styles.main_block_search_button}>Сохранить</button>
                    </div>
                  </div>
                </div>
    
        <div className={styles.main__container}>
          <div className={styles.main__h3}>Мои товары</div>
          <div className={styles.main__content}>
          {products.map(filteredProduct => (
            <ProductCard key={filteredProduct.id} product={filteredProduct} sellerId={users.id} editLink={`/profile/${filteredProduct.id}`} />
          ))}
          </div>
        </div>
      </div>
    </div>
    )
  }
  