import styles from './styles.module.css';
import Header from '../../components/Header';
import Search from '../../components/Search';

export const Myprofile = () => {
    return (
      <div>
      <Header />
      <div className={styles.conteiners}>
        <Search />
        <div className={styles.main__container}>
          <div className={styles.main__h2}>Мой профиль</div>
        </div>
      </div>
    </div>
    )
  }
  