import { useState } from 'react';
import styles from './styles.module.css';
import Header from '../../components/Header';
import Search from '../../components/Search';
import user from '../../img/main_img/photo_user.png';

export const Myadv = () => {
  const [products, setProducts] = useState([
    { id: 1, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
  ]);
    return (
      <div>
      <Header />
      <div className={styles.conteiners}>
        <Search />
        {products.map(product => (
          <div className={styles.main}>
            <div className={styles.main__info}>
                <div className={styles.main__info_picture}>
                    <div className={styles.main__info_picture_general}>
                        <img className={styles.main__info_bas} />
                        <div className={styles.main__info_addition}>
                          <img className={styles.addition} />
                          <img className={styles.addition} />
                          <img className={styles.addition} />
                          <img className={styles.addition} />
                          <img className={styles.addition} />
                          </div>
                    </div>
                </div>
                <div className={styles.main__info_text}>
                    <div className={styles.main__info_text_product}>
                      <div className={styles.main__h3}>{product.title}</div>
                    </div>
                    <div className={styles.main__info_text_buttons}>
                        <div className={styles.main__h3}>{product.price}</div>
                        <button>Редактировать</button>
                        <button>Снять с публикации</button>
                    
                    </div>
                    <div className={styles.main__info_text_seller}>
                    
                    </div>
                </div>
            </div>
            <div className={styles.main__container}>
                <div className={styles.main__h3}>Описание товара</div>
                <div className={styles.main__content}>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
  }
  