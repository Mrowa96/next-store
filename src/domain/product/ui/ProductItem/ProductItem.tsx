'use client';

import Image from 'next/image';

import { Button } from '@/ui/Button';

import { addProductToCart } from '../../actions';
import { type Product } from '../../types';
import { formatNumberToUSD } from '../../utils';
import styles from './ProductItem.module.css';

type Props = {
  product: Product;
};

export function ProductItem({ product }: Props) {
  const addToCartButtonClickHandler = async () => {
    await addProductToCart(product);
  };

  return (
    <article className={styles.ProductItem} data-testid="product-item">
      <div className={styles.ImageWrapper}>
        {!!product.image && (
          <Image
            src={product.image}
            alt={product.title}
            loading="lazy"
            className={styles.Image}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1200px) 33vw, 25vw"
            fill
          />
        )}
      </div>
      <h3 className={styles.Title} title={product.title}>
        <span className="line-clamp-3">{product.title}</span>
      </h3>
      <div className={styles.Footer}>
        <span className={styles.Price} data-testid="product-item-price">
          {formatNumberToUSD(product.price)}
        </span>

        <Button className={styles.AddToCartButton} onClick={addToCartButtonClickHandler}>
          Add to cart
        </Button>
      </div>
    </article>
  );
}
