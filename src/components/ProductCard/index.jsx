import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className={styles.content__cards}>
    
      <div className={styles.cards__item}>
        <div className={styles.cards__card}>
          <div className={styles.card__image}>
            <a href="#" target="_blank">
              <img src="#" alt="product" />
            </a>
          </div>
          <div className={styles.card__content}>
            <Link to='/profile/myproduct' className={styles.card__title}>{product.title}</Link>
            <p className={styles.card__price}>{product.price}</p>
            <p className={styles.card__place}>{product.place}</p>
            <p className={styles.card__date}>{product.date}</p>
          </div>
        </div>
      </div>
      
    </div>
   
  );
}

export default ProductCard;