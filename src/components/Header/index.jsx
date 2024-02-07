import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main_head}>
        <Link to="/profile">
        <button className={styles.main_button}>Вход в личный кабинет</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
