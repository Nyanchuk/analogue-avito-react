import { useState } from 'react';
import styles from './styles.module.css';
import Header from '../../components/Header';
import Search from '../../components/Search';
import ProductCard from '../../components/ProductCard';
import user from '../../img/main_img/photo_user.png';

export const Myprofile = () => {
  const [products, setProducts] = useState([
    { id: 1, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
    { id: 2, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
    { id: 3, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
    { id: 4, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
  ]);
    return (
      <div>
      <Header />
      <div className={styles.conteiners}>
        <Search />
        <div className={styles.main__container}>
          <div className={styles.main__h2}>Здравствуйте, Антон!</div>
          <span className={styles.main__h3}>Настройка профиля</span>
          <div className={styles.main__container_profile}>
            <div className={styles.main__container_profile_img}>
              <img className={styles.main__container_img} src={user} alt='photo user'/>
              <span>Заменить</span>
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
  