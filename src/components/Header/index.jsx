import styles from './styles.module.css';
import { useState } from 'react';
import exits from '../../img/main_img/exit.svg'
import hover from '../../img/main_img/hover_exit.svg'
import logo from '../../img/main_img/logo_modal.svg'

const Header = () => {
  // Стейт для открытия модального окна
  const [openModal, setOpenModal] = useState(false);
  // Стейт для отслеживания наведения курсора
  const [isHovered, setIsHovered] = useState(false);
    // Стейт формы регистрации
    const [isOpenFormRegistration, setIsOpenFormRegistration] = useState(false);

  // Открывает модальное окно
  const openModalClick = () => {
    setOpenModal(true);
  }
  // Закрывает модальное окно
  const closeModal = () => {
    setOpenModal(false);
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
    setIsOpenFormRegistration(true);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main_head}>
        <button className={styles.main_button} onClick={openModalClick}>Вход в личный кабинет</button>
      </div>
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
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
              onClick={closeModal}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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
