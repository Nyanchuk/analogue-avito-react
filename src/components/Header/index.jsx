import styles from './styles.module.css';
import { useEffect, useRef, useState } from 'react';
import exits from '../../img/main_img/exit.svg'
import hover from '../../img/main_img/hover_exit.svg'
import logo from '../../img/main_img/logo_modal.svg'
import add_photo from '../../img/main_img/add-image.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
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
      navigate('/profile');
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
              <input className={styles.modal_form_input} type='text' placeholder='email'></input>
              <input className={styles.modal_form_input} type='password' placeholder='Пароль'></input>
              {isOpenFormRegistration && (
                <div className={styles.modal_form}>
                  <input className={styles.modal_form_input} type='password' placeholder='Повторите пароль'></input>
                  <input className={styles.modal_form_input} type='text' placeholder='Имя (необязательно)'></input>
                  <input className={styles.modal_form_input} type='text' placeholder='Фамилия (необязательно)'></input>
                  <input className={styles.modal_form_input} type='text' placeholder='Город (необязательно)'></input>
                </div>
              )}
              <div className={styles.modal_form_button}>
              {isOpenFormRegistration === false && (
                <button type="button" className={styles.modal_button} onClick={closeModal}>Войти</button>
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
