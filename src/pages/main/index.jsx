import styles from './styles.module.css';
import Header from '../../components/Header';
import Search from '../../components/Search';
import ProductCard from '../../components/ProductCard';
import { useEffect, useState } from 'react';
import { getAllAds } from '../../api';

export const Main = () => {
  // Храним оригинальный массив объявлений
  const [products, setProducts] = useState([]);
  // Храним отфильтрованный массив объявлений
  const [filterProducts, setFilterProducts] = useState([])
  // Для ошибок
  const [error, setError] = useState('');
  // Для поиска 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAds();
        setProducts(data);
        setFilterProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // Функция для обновления страницы после добавления нового объявления
  const fetchAndUpdateProducts = async () => {
    try {
      const data = await getAllAds();
      setProducts(data);
      setFilterProducts(data);
    } catch (error) {
      console.error(error);
      setError('Произошла ошибка: ' + error.message);
    }
  };
  // Обработчик изменения строки поиска
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // Фильтрация
  const handleSearchButtonClick = () => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().charAt(0) === searchTerm.toLowerCase()
    );
    setFilterProducts(filtered);
  };
  // Сброс фильтров
  const handleShowAllButtonClick = () => {
    setFilterProducts(products);
    setSearchTerm('');
  };
  return (
    <div className={styles.container}>
      <Header  onAddNewAd={fetchAndUpdateProducts} />
      <div className={styles.conteiners}>
      <Search 
          onSearchInputChange={handleSearchInputChange} 
          onSearchButtonClick={handleSearchButtonClick} 
          searchTerm={searchTerm} 
          onShowAllClick={handleShowAllButtonClick}
        />
        <div className={styles.main__container}>
          <div className={styles.main__h2}>Объявления</div>
          <div className={styles.main__content}>
            {filterProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
