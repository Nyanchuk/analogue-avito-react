import styles from './styles.module.css';
import Header from '../../components/Header';
import Search from '../../components/Search';
import ProductCard from '../../components/ProductCard';
import { useState } from 'react';

export const Main = () => {
  const [products, setProducts] = useState([
    { id: 1, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
    { id: 2, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
    { id: 3, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
    { id: 4, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
    { id: 5, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
    { id: 6, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
    { id: 7, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
    { id: 8, title: "Ракетка для большого тенниса Triumph Pro ST", price: "2200 ₽", place: "Санкт Петербург", date: "Сегодня 10:45" },
  ]);
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
