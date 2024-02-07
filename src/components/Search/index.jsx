import styles from './styles.module.css';
import logo from '../../img/main_img/Logo.svg';

const Search = () => {
    return (
    <div className={styles.main_search}>
        <img src={logo} alt='logo'/>
        <input className={styles.main_block_search} placeholder="Поиск по объявлениям"></input>
        <button className={styles.main_block_search_button}>Найти</button>
      </div>
    );
}

export default Search;
