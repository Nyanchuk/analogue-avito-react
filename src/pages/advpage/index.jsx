import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import Header from '../../components/Header';
import Return from '../../components/Return';
import user from '../../img/main_img/photo_user.png';
import exits from '../../img/main_img/exit.svg'
import hover from '../../img/main_img/hover_exit.svg'
import notImage from '../../img/main_img/no-pictures.png'
import { Link, useParams } from 'react-router-dom';
import { getAds, getNewCommentText, refreshAccessToken } from '../../api';
import { getAllCommets } from '../../api';
import { useSelector } from 'react-redux';

export const Advpage = () => {
  // REDUX
  const isTokenGlobal = useSelector(state => state.product.tokenExists);
  // Получаем id объявления
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
  // Стейт для массива отзывов
  const [comments, setComments] = useState([]);
  // Стейт для хранения даты регистрации
  const [formattedSellsFromDate, setFormattedSellsFromDate] = useState('');
  // Стейт для числа отзывов
  const [ totalComments, setTotalComments ] = useState('');
  // Стейт для сокрытия номера
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  // Стейт для хранения ошибок
  const [error, setError] = useState('');
  

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
  // Обработка даты
  function formatDate(dateString) {
    const months = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
  
    const date = new Date(dateString);
    const day = date.getDate(); // Используем getDate() для получения числа дня месяца
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }
  // Получение объявления по id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAds(id);
        setProducts([data]);
        console.log(data);
        const createdDate = new Date(data.created_on);
        const formattedDate = `${createdDate.toLocaleDateString('ru-RU')} ${createdDate.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})}`;
        setProducts(prevProducts => {
          return prevProducts.map(product => ({
            ...product,
            formattedDate: formattedDate
          }));
        });
        const formattedSellsDate = formatDate(data.user.sells_from);
        setFormattedSellsFromDate(formattedSellsDate);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);
  // Получение всех комментариев
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCommets(id);
        setComments(data);
        console.log(data);
        const totalComments = data.length;
        setTotalComments(totalComments);
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
  // Обновление токена + создание нового комментария
  const setCommentUser = (id) => {
    const text = document.getElementById('comment').value;
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const errors = [];
    console.log(accessToken)
    console.log(refreshToken)
    switch(true) {
      case !text:
        errors.push('Введите текст!');
        break;
      default:
        setError('');
        const getNewToken = async () => {
          try {
            const serverResponse = await refreshAccessToken({
              accessToken,
              refreshToken,
            });
            if (serverResponse.status === 201) {
              console.log('Токен обновлен')
              await getNewCommentText( id, text, accessToken);
              const data = await getAllCommets(id);
              setComments(data);
              console.log(data);
              const totalComments = data.length;
              setTotalComments(totalComments);
              document.getElementById('comment').value = '';
            } else {
              setError('Ошибка при отправке комментария');
            }
          } catch (error) {
            console.log(error)
            setError('Ошибка при отправке данных');
          }
        };
        getNewToken();
      }
  };
  
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
                  {product.images[0] && product.images[0].url ? (
                    <img className={styles.main__info_bas} src={`http://localhost:8090/${product.images[0].url}`} alt='photo product'/>
                  ) : (
                    <img src={notImage} alt="product" className={styles.main__info_bas}/>
                  )}
                  <div className={styles.main__info_addition}>
                    {product.images.slice(1).map((image, index) => (
                      image.url ? (
                        <img key={index} className={styles.addition} src={`http://localhost:8090/${image.url}`} alt={`photo ${index + 2}`} />
                      ) : (
                        <div key={index}>Картинка отсутствует</div>
                      )
                    ))}
                  </div>
            </div>
          </div>
            <div className={styles.main__info_text}>
                    <div className={styles.main__info_text_product}>
                      <div className={styles.main__h3}>{product.title}</div>
                      <div className={styles.main__detailed}>
                        <span>{product.formattedDate}</span>
                        <span>{product.user.city}</span>
                        {/* число отзывов */}
                        {totalComments > 0 ? (
                          <div>
                            <span className={styles.main__reviews} onClick={openModalClick}>
                              {`${totalComments} ${totalComments === 1 ? 'отзыв' : 'отзыва'}`}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className={styles.main__reviews} onClick={openModalClick}>Нет отзывов</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.main__info_text_buttons}>
                        <div className={styles.main__h3}>{product.price} ₽</div>
                        <div className={styles.main__product_buttons}>
                        <div className={`${styles.main_button} ${styles.update}`} onClick={() => setShowPhoneNumber(true)}>
                          Показать телефон <br /> 
                          <span className={styles.main_button_num}>
                          {showPhoneNumber ? (product.user.phone ? product.user.phone : '') : (product.user.phone ? `${product.user.phone.substring(0, 2)} ❉ ❉ ❉ ❉ ❉ ❉ ❉ ❉ ❉` : '')}
                          </span>
                        </div>
                        </div>
                    </div>
                    <div className={styles.main__info_text_seller}>
                    {product.user.avatar ? (
                      <img className={styles.main__container_img} src={`http://localhost:8090/${product.user.avatar}`} alt='photo user'/>
                    ) : (
                      <img className={styles.main__container_img} src={user} alt='photo user'/>
                    )}
                      <div className={styles.main__detailed}>
                        <Link to={`/product/${product.id}/seller/${product.user.id}`} style={{color: "#009EE4", fontWeight: "bold"}}>{product.user.name}</Link>
                        <span>Продает товары с {formattedSellsFromDate}</span>
                      </div>
                    </div>
            </div>
          </div>
            <div className={styles.main__container}>
                  <div className={styles.main__h3}>Описание товара</div>
                  <div className={styles.main__content}>
                    {product.description}
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
                  <textarea id='comment' className={styles.modal_form_input} type='text' placeholder='Введите отзыв'/>
                </div>
                <button type="button" className={`${styles.main_button} ${styles.save}`} disabled={!isTokenGlobal} onClick={() => setCommentUser(id)}>
                Опубликовать
              </button>
                <div className={styles.modal_form_block}>
                  <div className={styles.modal_form_textarea}>
                  {comments.map(comment => 
                    <div key={comment.id} className={styles.modal_block}>
                      {comment.author.avatar ? (
                      <img className={styles.main__container_img} src={`http://localhost:8090/${comment.author.avatar}`} alt='photo user'/>
                    ) : (
                      <img className={styles.main__container_img} src={user} alt='photo user'/>
                    )}
                        <div className={styles.modal_block_info}>
                            <div className={styles.modal_block_author}>
                              <span style={{fontWeight: 'bold'}}>{comment.author.name}</span>
                              <span style={{color: '#5F5F5F'}}>{new Date(comment.created_on).toLocaleDateString()}</span>
                            </div>
                            <div className={styles.modal_block_coment}>
                                <span style={{fontWeight: 'bold'}}>Комментарий</span>
                                <span>{comment.text}</span>
                            </div>
                        </div>
                    </div>
                  )} 
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
  