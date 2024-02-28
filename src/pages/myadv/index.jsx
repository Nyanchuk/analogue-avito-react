import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Header from "../../components/Header";
import user from "../../img/main_img/photo_user.png";
import exits from "../../img/main_img/exit.svg";
import hover from "../../img/main_img/hover_exit.svg";
import notImage from "../../img/main_img/no-pictures.png";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Return from "../../components/Return";
import { getAds, getNewCommentText, deleteItemAds } from "../../api";
import { getAllCommets } from "../../api";

export const Myadv = ({ isAuthenticated }) => {
  // REDUX
  const isTokenGlobal = useSelector((state) => state.product.tokenExists);
  const navigate = useNavigate();
  // Получаем id объявления
  const { id } = useParams();
  // Стейт для изменения контента
  const [product, setProduct] = useState({ text: "" });
  // Стейт для открытия модального окна
  const [openModal, setOpenModal] = useState(false);
  // Стейт для открытия модального окна
  const [openModalTwo, setOpenModalTwo] = useState(false);
  // Для закрытия окна при клике вне окна
  const modalRef = useRef();
  // Стейт для отслеживания наведения курсора
  const [isHovered, setIsHovered] = useState(false);
  // Стейт для статичных данных
  const [products, setProducts] = useState([]);
  // Стейт для массива отзывов
  const [comments, setComments] = useState([]);
  // Стейт для хранения даты регистрации
  const [formattedSellsFromDate, setFormattedSellsFromDate] = useState("");
  // Стейт для числа отзывов
  const [totalComments, setTotalComments] = useState("");
  // Стейт для хранения ошибок
  const [error, setError] = useState("");

  // Проверка авторизации
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Событие при наведении
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  // Снятие события при наведении
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // Открывает модальное окно
  const openModalClick = () => {
    setOpenModal(true);
  };
  // Открывает второе модальное окно
  const openModalClickTwo = () => {
    setOpenModalTwo(true);
  };
  // Закрывает модальное окно
  const closeModal = () => {
    setOpenModal(false);
    setIsHovered(false);
    setOpenModalTwo(false);
  };
  // Закрывает модальное окно при клике за его пределами
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);
  // Обработка даты
  function formatDate(dateString) {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
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
        const formattedDate = `${createdDate.toLocaleDateString(
          "ru-RU"
        )} ${createdDate.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
        setProducts((prevProducts) => {
          return prevProducts.map((product) => ({
            ...product,
            formattedDate: formattedDate,
          }));
        });
        const formattedSellsDate = formatDate(data.user.sells_from);
        setFormattedSellsFromDate(formattedSellsDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  // Обновление токена + создание нового комментария
  const setCommentUser = (id) => {
    const text = document.getElementById("comment").value;
    const errors = [];
    switch (true) {
      case !text:
        errors.push("Введите текст!");
        break;
      default:
        setError("");
        getNewCommentText(id, text)
          .then(() => getAllCommets(id))
          .then((comments) => {
            setComments(comments);
            const totalComments = comments.length;
            setTotalComments(totalComments);
            document.getElementById("comment").value = "";
          })
          .catch((error) => {
            console.error(error);
            setError("Ошибка при получении комментариев");
          });
    }
  };
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
  // Удаление объявления
  const deleteMyAds = async (id) => {
    try {
      await deleteItemAds(id);
      console.log('Ваше объявление удалено');
      navigate('/profile')
    } catch (error) {
      console.error(error);
      setError("Ошибка при удалении объявления");
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.conteiners}>
        <Return />
        {products.map((product) => (
          <div key={product.id} className={styles.main}>
            <div className={styles.main__info}>
              <div className={styles.main__info_picture}>
                <div className={styles.main__info_picture_general}>
                  {product.images[0] && product.images[0].url ? (
                    <img
                      className={styles.main__info_bas}
                      src={`http://localhost:8090/${product.images[0].url}`}
                      alt="photo product"
                    />
                  ) : (
                    <img
                      src={notImage}
                      alt="product"
                      className={styles.main__info_bas}
                    />
                  )}
                  <div className={styles.main__info_addition}>
                    {product.images
                      .slice(1)
                      .map((image, index) =>
                        image.url ? (
                          <img
                            key={index}
                            className={styles.addition}
                            src={`http://localhost:8090/${image.url}`}
                            alt={`photo ${index + 2}`}
                          />
                        ) : (
                          <div key={index}>Картинка отсутствует</div>
                        )
                      )}
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
                        <span
                          className={styles.main__reviews}
                          onClick={openModalClickTwo}
                        >
                          {`${totalComments} ${
                            totalComments === 1 ? "отзыв" : "отзыва"
                          }`}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span
                          className={styles.main__reviews}
                          onClick={openModalClickTwo}
                        >
                          Нет отзывов
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.main__info_text_buttons}>
                  <div className={styles.main__h3}>{product.price} ₽</div>
                  <div className={styles.main__product_buttons}>
                    <button
                      className={`${styles.main_button} ${styles.update}`}
                      onClick={openModalClick}
                    >
                      Редактировать
                    </button>
                    <button
                      className={`${styles.main_button} ${styles.delete}`}
                      onClick={() => deleteMyAds(id)}
                    >
                      Снять с публикации
                    </button>
                  </div>
                </div>
                <div className={styles.main__info_text_seller}>
                  <img
                    className={styles.main__container_img}
                    src={user}
                    alt="photo user"
                  />
                  <div className={styles.main__detailed}>
                    <span style={{ color: "#009EE4", fontWeight: "bold" }}>
                      {product.user.name}
                    </span>
                    <span>Продает товары с {formattedSellsFromDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.main__container}>
              <div className={styles.main__h3}>Описание товара</div>
              <div className={styles.main__content}>{product.description}</div>
            </div>
          </div>
        ))}
      </div>
      {openModalTwo && (
        <div className={styles.modalTwo}>
          <div className={styles.modalContentTwo} ref={modalRef}>
            <form className={styles.modal_formTwo} key={product.id}>
              <span className={styles.modal_form_titleTwo}>Отзывы о товаре</span>
              <div className={styles.modal_form_blockTwo}>
                <span>Добавить отзыв</span>
                <textarea
                  id="comment"
                  className={styles.modal_form_inputTwo}
                  type="text"
                  placeholder="Введите отзыв"
                />
              </div>
              <button
                type="button"
                className={`${styles.main_button} ${styles.save}`}
                disabled={!isTokenGlobal}
                onClick={() => setCommentUser(id)}
              >
                Опубликовать
              </button>
              <div className={styles.modal_form_blockTwo}>
                <div className={styles.modal_form_textarea}>
                  {comments.map((comment) => (
                    <div key={comment.id} className={styles.modal_block}>
                      {comment.author.avatar ? (
                        <img
                          className={styles.main__container_img}
                          src={`http://localhost:8090/${comment.author.avatar}`}
                          alt="photo user"
                        />
                      ) : (
                        <img
                          className={styles.main__container_img}
                          src={user}
                          alt="photo user"
                        />
                      )}
                      <div className={styles.modal_block_infoTwo}>
                        <div className={styles.modal_block_authorTwo}>
                          <span style={{ fontWeight: "bold" }}>
                            {comment.author.name}
                          </span>
                          <span style={{ color: "#5F5F5F" }}>
                            {new Date(comment.created_on).toLocaleDateString()}
                          </span>
                        </div>
                        <div className={styles.modal_block_comentTwo}>
                          <span style={{ fontWeight: "bold" }}>
                            Комментарий
                          </span>
                          <span>{comment.text}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            <img
              src={isHovered ? hover : exits}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={closeModal}
              className={styles.closeButton}
              alt="exit"
            />
          </div>
        </div>
      )}
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent} ref={modalRef}>
            {products.map((product) => (
              <form className={styles.modal_form} key={product.id}>
                <span className={styles.modal_form_title}>
                  Редактировать объявление
                </span>
                <div className={styles.modal_form_block}>
                  <span>Название</span>
                  <input
                    className={styles.modal_form_input}
                    type="text"
                    placeholder="Название продукта"
                    defaultValue={product.title}
                  />
                </div>
                <div className={styles.modal_form_block}>
                  <span>Описание</span>
                  <textarea
                    className={styles.modal_form_textarea}
                    placeholder="Описание продукта"
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
                    <input
                      className={styles.modal_form_price}
                      type="text"
                      placeholder="Название продукта"
                      defaultValue={product.price}
                    />
                    <select className={styles.currency_select}>
                      <option value="rub">₽</option>
                      <option value="usd">$</option>
                      <option value="eur">€</option>
                    </select>
                  </div>
                </div>
                <button className={`${styles.main_button} ${styles.save}`}>
                  Сохранить
                </button>
              </form>
            ))}
            <img
              src={isHovered ? hover : exits}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={closeModal}
              className={styles.closeButton}
              alt="exit"
            />
          </div>
        </div>
      )}
    </div>
  );
};
