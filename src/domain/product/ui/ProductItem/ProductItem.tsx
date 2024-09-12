'use client';

import { useFormState, useFormStatus } from 'react-dom';

import Image from 'next/image';

import { Button } from '@/ui/Button';

import { addProductToCartAction } from '../../actions';
import { type Product } from '../../types';
import { formatNumberToUSD } from '../../utils';
import styles from './ProductItem.module.css';

type Props = {
  product: Product;
};

function AddToCartButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={styles.AddToCartButton} disabled={pending}>
      Add to cart
    </Button>
  );
}

export function ProductItem({ product }: Props) {
  const [, addTProductToCart] = useFormState(addProductToCartAction, {
    status: 'initial',
    error: null,
  });

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

        <form action={addTProductToCart}>
          <input type="hidden" name="id" value={product.id} />
          <input type="hidden" name="title" value={product.title} />
          <input type="hidden" name="price" value={product.price} />

          <AddToCartButton />
        </form>
      </div>
    </article>
  );
}
