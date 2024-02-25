import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Header from '../../components/Header';
import Return from '../../components/Return';
import ProductCard from '../../components/ProductCard';
import user from '../../img/main_img/photo_user.png';
import { useNavigate } from 'react-router-dom';
import { getAllAds, getMyProfile, refreshAccessToken, setUpdateUser, uploadUserPhoto } from '../../api';

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
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        setError('');
  
        const tokenResponse = await refreshAccessToken({ accessToken, refreshToken });
        if (tokenResponse.status !== 201) {
          throw new Error('Ошибка при обновлении токена');
        }
  
        console.log('Токен обновлен');
  
        const userProfile = await getMyProfile(tokenResponse.access_token);
        console.log(userProfile);
        setUsers(userProfile);
  
        const adsData = await getAllAds();
        console.log(adsData);
        const userProducts = adsData.filter(product => product.sellerId === userProfile.id);
        setProducts(userProducts);
      } catch (error) {
        console.error(error);
        setError('Произошла ошибка: ' + error.message);
      }
    };
  
    fetchData();
  }, []);
  // Обновление данных юзера
  const updateUserInfo = () => {
    const role = 'user';
    const email = users.email;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const errors = [];
    switch(true) {
      case !name:
        errors.push('Введите имя!');
        break;
      case !surname:
        errors.push('Введите фамилию!');
        break;
      case !phone:
        errors.push('Введите телефон!');
        break;
      case !city:
        errors.push('Введите город!');
        break;
      default:
        setError('');
        refreshAccessToken({ accessToken, refreshToken })
          .then((serverResponse) => {
            if (serverResponse.status === 201) {
              console.log('Токен обновлен');
              return setUpdateUser({ role, email, name, surname, phone, city, accessToken });
            } else {
              throw new Error('Ошибка при обновлении токена');
            }
          })
          .then(() => {
            return getMyProfile(accessToken);
          })
          .catch((error) => {
            console.error(error);
            setError('Произошла ошибка: ' + error.message);
          });
    }
  };
// Обновление фото юзера
const updatePhotoUser = async (event) => {
  const accessToken = localStorage.getItem('accessToken');
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    await uploadUserPhoto(formData);
    // После успешной загрузки изображения, обновляем информацию о профиле
    const userProfile = await getMyProfile(accessToken);
    setUsers(userProfile);
  }
};
    return (
      <div>
      <Header />
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
          {products
            .filter(product => product.sellerId === users.id)
            .map(filteredProduct => (
              <ProductCard key={filteredProduct.id} product={filteredProduct} sellerId={users.id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }
  