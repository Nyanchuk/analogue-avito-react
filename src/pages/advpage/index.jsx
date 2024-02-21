import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import Header from '../../components/Header';
import Return from '../../components/Return';
import user from '../../img/main_img/photo_user.png';
import exits from '../../img/main_img/exit.svg'
import hover from '../../img/main_img/hover_exit.svg'
import { useParams } from 'react-router-dom';
import { getAds } from '../../api';

export const Advpage = () => {
  const { id } = useParams();
  
  // Стейт для изменения контента
  const [product, setProduct] = useState({ text: '' });
  // Стейт для открытия модального окна
  const [openModal, setOpenModal] = useState(false);
  // Для закрытия окна при клике вне окна
  const modalRef = useRef();
  // Стейт для отслеживания наведения курсора
  const [isHovered, setIsHovered] = useState(false);
  // Стейт для статичных данных
  const [products, setProducts] = useState([]);

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

  // Получение объявления по id
  useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getAds(id);
          setProducts([data]);
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
  }, [id]);
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
        <Return />
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
                        <span className={styles.main__reviews} onClick={openModalClick}>4 отзыва</span>
                      </div>
                    </div>
                    <div className={styles.main__info_text_buttons}>
                        <div className={styles.main__h3}>{product.price}</div>
                        <div className={styles.main__product_buttons}>
                          <div className={`${styles.main_button} ${styles.update}`}>Показать телефон <br /> <span className={styles.main_button_num}>+ 905 ХХХ ХХ ХХ</span></div>
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
              <form className={styles.modal_form} key={product.id}>
                <span className={styles.modal_form_title}>Отзывы о товаре</span>
                <div className={styles.modal_form_block}>
                  <span>Добавить отзыв</span>
                  <textarea className={styles.modal_form_input} type='text' placeholder='Введите отзыв'/>
                </div>
                <button className={`${styles.main_button} ${styles.save}`}>Опубликовать</button>
                <div className={styles.modal_form_block}>
                  <div className={styles.modal_form_textarea}>
                    <div className={styles.modal_block}>
                      <img className={styles.main__container_img} src={user} alt='photo user'/>
                      <div className={styles.modal_block_info}>
                        <div className={styles.modal_block_author}>
                          <span>Олег</span>
                          <span>14 августа</span>
                        </div>
                        <div className={styles.modal_block_coment}>
                          <span>Комментарий</span>
                          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam recusandae, harum reiciendis inventore natus animi!</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.modal_block}>
                      <img className={styles.main__container_img} src={user} alt='photo user'/>
                      <div className={styles.modal_block_info}>
                        <div className={styles.modal_block_author}>
                          <span>Олег</span>
                          <span>14 августа</span>
                        </div>
                        <div className={styles.modal_block_coment}>
                          <span>Комментарий</span>
                          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident velit ratione quasi harum inventore ut nisi, dolorem quas veniam. Quo quidem cum harum cupiditate doloremque, ex distinctio similique tenetur eligendi odit hic. Neque, temporibus?</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.modal_block}>
                      <img className={styles.main__container_img} src={user} alt='photo user'/>
                      <div className={styles.modal_block_info}>
                        <div className={styles.modal_block_author}>
                          <span>Олег</span>
                          <span>14 августа</span>
                        </div>
                        <div className={styles.modal_block_coment}>
                          <span>Комментарий</span>
                          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident velit ratione quasi harum inventore ut nisi, dolorem quas veniam. Quo quidem cum harum cupiditate doloremque, ex distinctio similique tenetur eligendi odit hic. Neque, temporibus?</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.modal_block}>
                      <img className={styles.main__container_img} src={user} alt='photo user'/>
                      <div className={styles.modal_block_info}>
                        <div className={styles.modal_block_author}>
                          <span>Олег</span>
                          <span>14 августа</span>
                        </div>
                        <div className={styles.modal_block_coment}>
                          <span>Комментарий</span>
                          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident velit ratione quasi harum inventore ut nisi, dolorem quas veniam. Quo quidem cum harum cupiditate doloremque, ex distinctio similique tenetur eligendi odit hic. Neque, temporibus?</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.modal_block}>
                      <img className={styles.main__container_img} src={user} alt='photo user'/>
                      <div className={styles.modal_block_info}>
                        <div className={styles.modal_block_author}>
                          <span>Олег</span>
                          <span>14 августа</span>
                        </div>
                        <div className={styles.modal_block_coment}>
                          <span>Комментарий</span>
                          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident velit ratione quasi harum inventore ut nisi, dolorem quas veniam. Quo quidem cum harum cupiditate doloremque, ex distinctio similique tenetur eligendi odit hic. Neque, temporibus?</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
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
  