import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import Header from '../../components/Header';
import Search from '../../components/Search';
import user from '../../img/main_img/photo_user.png';
import exits from '../../img/main_img/exit.svg'
import hover from '../../img/main_img/hover_exit.svg'
import { useNavigate } from 'react-router-dom';

export const Myadv = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  // Стейт для изменения контента
  const [product, setProduct] = useState({ text: '' });
  // Стейт для открытия модального окна
  const [openModal, setOpenModal] = useState(false);
  // Для закрытия окна при клике вне окна
  const modalRef = useRef();
  // Стейт для отслеживания наведения курсора
  const [isHovered, setIsHovered] = useState(false);
  // Стейт для статичных данных
  const [products, setProducts] = useState([
    { id: 1, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2 200", place: "Санкт Петербург", date: "Сегодня 10:45", text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita earum deleniti distinctio itaque reprehenderit provident aliquid in aut. Incidunt error, consectetur sequi fugit eos iste, quasi excepturi nisi vero temporibus repellat quam numquam doloribus et facilis dolores. Inventore illo facilis a, minima fugit nisi eum laboriosam veritatis magnam alias quasi."},
  ]);
  // Проверка авторизации
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Событие при наведении
  const handleMouseEnter = () => {
    setIsHovered(true);
  }
  // Снятие события при наведении
  const handleMouseLeave = () => {
    setIsHovered(false);
  }
  // Открывает модальное окно
  const openModalClick = () => {
    setOpenModal(true);
  }
  // Закрывает модальное окно
  const closeModal = () => {
      setOpenModal(false);
      setIsHovered(false);
  }
  // Закрывает модальное окно при клике за его пределами
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

    return (
      <div>
      <Header />
      <div className={styles.conteiners}>
        <Search />
        {products.map(product => (
          <div key={product.id} className={styles.main}>
            <div className={styles.main__info}>
                <div className={styles.main__info_picture}>
                    <div className={styles.main__info_picture_general}>
                        <img className={styles.main__info_bas}/>
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
                      <div className={styles.main__detailed}>
                        <span>Сегодня в 10:45</span>
                        <span>Санкт-Петербург</span>
                        <span className={styles.main__reviews}>4 отзыва</span>
                      </div>
                    </div>
                    <div className={styles.main__info_text_buttons}>
                        <div className={styles.main__h3}>{product.price}</div>
                        <div className={styles.main__product_buttons}>
                          <button className={`${styles.main_button} ${styles.update}`} onClick={openModalClick}>Редактировать</button>
                          <button className={`${styles.main_button} ${styles.delete}`}>Снять с публикации</button>
                        </div>
                        
                    </div>
                    <div className={styles.main__info_text_seller}>
                    <img className={styles.main__container_img} src={user} alt='photo user'/>
                      <div className={styles.main__detailed}>
                        <span style={{color: "#009EE4", fontWeight: "bold"}}>Антон</span>
                        <span>Продает товары с мая 2022</span>
                      </div>
                    </div>
                </div>
            </div>
            <div className={styles.main__container}>
                <div className={styles.main__h3}>Описание товара</div>
                <div className={styles.main__content}>
                  {product.text}
                </div>
            </div>
          </div>
        ))}
      </div>
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent} ref={modalRef}>
            {products.map(product => (
              <form className={styles.modal_form} key={product.id}>
                <span className={styles.modal_form_title}>Редактировать объявление</span>
                <div className={styles.modal_form_block}>
                  <span>Название</span>
                  <input className={styles.modal_form_input} type='text' placeholder='Название продукта' defaultValue={product.title}  />
                </div>
                <div className={styles.modal_form_block}>
                  <span>Описание</span>
                  <textarea 
                    className={styles.modal_form_textarea} 
                    placeholder='Описание продукта' 
                    defaultValue={product.text}
                  />
                </div>
                <div className={styles.modal_form_img}>
                  <span>Фотограции товара</span>
                  <div className={styles.main__info_addition}>
                    <img className={styles.addition} />
                    <img className={styles.addition} />
                    <img className={styles.addition} />
                    <img className={styles.addition} />
                    <img className={styles.addition} />
                  </div>
                </div>
                <div className={styles.modal_form_block}>
                  <span>Цена</span>
                  <div>
                    <input className={styles.modal_form_price} type='text' placeholder='Название продукта' defaultValue={product.price}/>
                    <select className={styles.currency_select}>
                      <option value='rub'>₽</option>
                      <option value='usd'>$</option>
                      <option value='eur'>€</option>
                    </select>
                  </div>
                </div>
                <button className={`${styles.main_button} ${styles.save}`}>Сохранить</button>
              </form>
            ))}
            <img
              src={isHovered ? hover : exits}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={closeModal}
              className={styles.closeButton}
              alt='exit'
            />
          </div>
        </div>
      )}
    </div>
    )
  }
  