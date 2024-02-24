import styles from './styles.module.css';
import { useEffect, useRef, useState } from 'react';
import exits from '../../img/main_img/exit.svg'
import hover from '../../img/main_img/hover_exit.svg'
import logo from '../../img/main_img/logo_modal.svg'
import add_photo from '../../img/main_img/add-image.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendAuthenticationToServer, sendRegistrationDataToServer } from '../../api';
import { setTokenExists } from '../../store/actions/creators/productCreators';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Стейт для открытия модального окна
  const [openModal, setOpenModal] = useState(false);
  // Стейт для модального окна размещения обьявления
  const [openModalTwo, setOpenModalTwo] = useState(false);
  // Стейт для отслеживания наведения курсора
  const [isHovered, setIsHovered] = useState(false);
  // Стейт формы регистрации
  const [isOpenFormRegistration, setIsOpenFormRegistration] = useState(false);
  // Для закрытия окна при клике вне окна
  const modalRef = useRef();
  // Стейт для хранения ошибок
  const [error, setError] = useState('');
  // REDUX
  const isTokenGlobal = useSelector(state => state.product.tokenExists);

  // Открывает модальное окно
  const openModalClick = () => {
    setOpenModal(true);
  }
    // Открывает модальное окно размещения обьявления
    const openModalClickTwo = () => {
      setOpenModalTwo(true);
    }
  // Закрывает модальное окно
  const closeModal = () => {
    setOpenModal(false);
    setOpenModalTwo(false);
    setIsHovered(false);
    setIsOpenFormRegistration(false);
  }
  // Событие при наведении
  const handleMouseEnter = () => {
    setIsHovered(true);
  }
  // Снятие события при наведении
  const handleMouseLeave = () => {
    setIsHovered(false);
  }
  // Показ формы регистрации
  const hendleClickOpenFormReg = () => {
    if (isOpenFormRegistration) {
      handleRegisterUser();
    } else {
      setIsOpenFormRegistration(true);
    }
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
  // Регистрация
  const handleRegisterUser = () => {
    const role = 'user';
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const errors = [];
    switch (true) {
      case newPassword !== repeatPassword:
        errors.push('Пароли не совпадают!');
        break;
      case !newPassword || !repeatPassword:
        errors.push('Введите пароли!');
        break;
      case !email:
        errors.push('Введите email!');
        break;
      case !name:
        errors.push('Введите имя!');
        break;
      case !phone:
        errors.push('Введите номер телефона!');
        break;
      case !city:
        errors.push('Укажите город!');
        break;
      default:
        setError('');
        const responce = async () => {
          try {
            const serverResponse = await sendRegistrationDataToServer({
              password: newPassword,
              role,
              email,
              name,
              surname,
              phone,
              city,
            });
  
            if (serverResponse.status === 201) {
              setIsOpenFormRegistration(false);
            } else {
              setError('Ошибка при регистрации');
            }
          } catch (error) {
            console.log(error)
            setError('Ошибка при отправке данных');
          }
        };
        responce();
    }
  };
  // Авторизация
  const handleAuthorizUser = ( )=> {
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('password').value;
    const errors = [];
    switch(true) {
      case !email:
        errors.push('Введите email!');
        break;
      case !newPassword:
        errors.push('Введите пароль!');
        break;
      default:
        setError('');
        const getToken = async () => {
          try {
            const serverResponse = await sendAuthenticationToServer({
              password: newPassword,
              email,
            });
  
            if (serverResponse.access_token && serverResponse.refresh_token) {
              localStorage.setItem('accessToken', serverResponse.access_token);
              localStorage.setItem('refreshToken', serverResponse.refresh_token);
              dispatch(setTokenExists(true));
              closeModal();
              // ... Другие действия после успешной аутентификации
            } else {
              setError('Ошибка при регистрации');
              dispatch(setTokenExists(false));
            }
          } catch (error) {
            console.log(error)
            setError('Ошибка при отправке данных');
          }
        };
        getToken();

    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main_head}>
      {isTokenGlobal ? ( // Проверка стейта из Redux
          <div className={styles.main_buttons}>
            <button className={styles.main_button} onClick={openModalClickTwo}>Разместить объявление</button>
            <button className={styles.main_button} onClick={() => navigate('/profile')}>Личный кабинет</button>
            <button className={styles.main_button_exit}>Выйти</button>
          </div>
        ) : (
          <button className={styles.main_button} onClick={openModalClick}>Вход в личный кабинет</button>
        )}
      </div>
      {openModal && (
        <div className={styles.modal} >
          <div className={styles.modalContent} ref={modalRef}>
            <form className={styles.modal_form}>
              <img src={logo} alt='logo'/>
              <input className={styles.modal_form_input} id='email' type='text' placeholder='email'></input>
              <input className={styles.modal_form_input} id='password' type='password' placeholder='Пароль'></input>
              {isOpenFormRegistration && (
                <div className={styles.modal_form}>
                  <input className={styles.modal_form_input} id='repeatPassword' type='password' placeholder='Повторите пароль'></input>
                  <input className={styles.modal_form_input} id='name' type='text' placeholder='Имя (необязательно)'></input>
                  <input className={styles.modal_form_input} id='surname' type='text' placeholder='Фамилия (необязательно)'></input>
                  <input className={styles.modal_form_input} id='phone' type='text' placeholder='Номер (необязательно)'></input>
                  <input className={styles.modal_form_input} id='city' type='text' placeholder='Город (необязательно)'></input>
                </div>
              )}
              <div className={styles.modal_form_button}>
              {isOpenFormRegistration === false && (
                <button type="button" className={styles.modal_button} onClick={handleAuthorizUser}>Войти</button>
              )}
              <button
                type="button"
                className={isOpenFormRegistration ? styles.modal_button : styles.modal_button_two} 
                onClick={hendleClickOpenFormReg}
              >
              Зарегистрироваться
              </button>
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
      {openModalTwo && (
                <div className={styles.modal_two}>
                <div className={styles.modalContent_two} ref={modalRef}>
 
                    <form className={styles.modal_form_two}>
                      <span className={styles.modal_form_title}>Новое объявление</span>
                      <div className={styles.modal_form_block}>
                        <span>Название</span>
                        <input className={styles.modal_form_input_two} type='text' placeholder='Название продукта' />
                      </div>
                      <div className={styles.modal_form_block}>
                        <span>Описание</span>
                        <textarea 
                          className={styles.modal_form_textarea} 
                          placeholder='Описание продукта' 
                        />
                      </div>
                      <div className={styles.modal_form_img}>
                        <span>Фотограции товара</span>
                        <div className={styles.main__info_addition}>
                          <img src={add_photo} className={styles.addition} />
                          <img src={add_photo} className={styles.addition} />
                          <img src={add_photo} className={styles.addition} />
                          <img src={add_photo} className={styles.addition} />
                          <img src={add_photo} className={styles.addition} />
                        </div>
                      </div>
                      <div className={styles.modal_form_block}>
                        <span>Цена</span>
                        <div>
                          <input className={styles.modal_form_price} type='text' placeholder='Цена'/>
                          <select className={styles.currency_select}>
                            <option value='rub'>₽</option>
                            <option value='usd'>$</option>
                            <option value='eur'>€</option>
                          </select>
                        </div>
                      </div>
                      <button className={`${styles.main_button} ${styles.save}`} disabled={!isTokenGlobal}>
                        Опубликовать
                      </button>
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
  );
}

export default Header;
