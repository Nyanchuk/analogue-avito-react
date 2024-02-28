import styles from './styles.module.css';
import logo from '../../img/main_img/Logo.svg';

const Search = ({ onSearchInputChange, onSearchButtonClick, searchTerm, onShowAllClick}) => {
  return (
    <div className={styles.main_search}>
      <img src={logo} alt='logo'/>
      <input 
        className={styles.main_block_search} 
        placeholder="Поиск по объявлениям"
        value={searchTerm}
        onChange={onSearchInputChange}
      />
      <button className={styles.main_block_search_button} onClick={onSearchButtonClick}>Найти</button>
      <button className={styles.main_block_return_button} onClick={onShowAllClick} >Все объявления</button>
    </div>
  );
}

export default Search;
