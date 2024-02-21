import styles from './styles.module.css';
import Header from '../../components/Header';
import Search from '../../components/Search';
import ProductCard from '../../components/ProductCard';
import { useEffect, useState } from 'react';
import { getAllAds } from '../../api';

export const Main = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAds();
        setProducts(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.conteiners}>
        <Search />
        <div className={styles.main__container}>
          <div className={styles.main__h2}>Объявления</div>
          <div className={styles.main__content}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
