import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Header from '../../components/Header';
import Return from '../../components/Return';
import ProductCard from '../../components/ProductCard';
import user from '../../img/main_img/photo_user.png';
import { useNavigate } from 'react-router-dom';
import { getAllAds, getMyProfile, refreshAccessToken } from '../../api';

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
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    setError('');
  
    refreshAccessToken({ accessToken, refreshToken })
      .then((serverResponse) => {
        if (serverResponse.status === 201) {
          console.log('Токен обновлен');
          return getMyProfile(serverResponse.access_token);
        } else {
          throw new Error('Ошибка при обновлении токена');
        }
      })
      .then((data) => {
        console.log(data)
        setUsers(data);
        return getAllAds();
      })
      .then((adsData) => {
        setProducts(adsData);
      })
      .catch((error) => {
        console.error(error);
        setError('Произошла ошибка: ' + error.message);
      });
  }, []);

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
                      <img className={styles.main__container_img} src={user} alt='photo user'/>
                      <span >Заменить</span>
                    </div>
                    <div className={styles.main__container_user}>
                      <div className={styles.main__container_info_user}>
                        <div className={styles.main__container_name}>
                          <span>Имя</span>
                          <input className={styles.main__name_input}></input>
                        </div>
                        <div className={styles.main__container_name}>
                          <span>Фамилия</span>
                          <input className={styles.main__name_input}></input>
                        </div>
                      </div>
                      <div className={styles.main__container_name}>
                        <span>Город</span>
                        <input className={styles.main__name_input}></input>
                      </div>
                      <div className={styles.main__container_name}>
                        <span>Телефон</span>
                        <input className={styles.main__name_input}></input>
                      </div>
                      <button className={styles.main_block_search_button}>Сохранить</button>
                    </div>
                  </div>
                </div>
    
        <div className={styles.main__container}>
          <div className={styles.main__h3}>Мои товары</div>
          <div className={styles.main__content}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }
  