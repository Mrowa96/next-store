'use client';

import { useFormState, useFormStatus } from 'react-dom';

import {
  decreaseProductQuantityAction,
  increaseProductQuantityAction,
  removeProductAction,
} from '@/domain/cart/actions';
import { type CartWithProducts } from '@/domain/cart/types';
import { formatNumberToUSD } from '@/domain/product/utils';

import { Button } from '@/ui/Button';

import styles from './CartManagerItem.module.scss';

type Props = {
  product: CartWithProducts['products'][number];
};

function DecreaseQuantityButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="secondary" shape="round" disabled={pending}>
      -
    </Button>
  );
}

function IncreaseQuantityButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="secondary" shape="round" disabled={pending}>
      +
    </Button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="critical" disabled={pending}>
      Delete
    </Button>
  );
}

export function CartManagerItem({ product }: Props) {
  const [, increaseQuantity] = useFormState(increaseProductQuantityAction, {
    status: 'initial',
    error: null,
  });
  const [, decreaseQuantity] = useFormState(decreaseProductQuantityAction, {
    status: 'initial',
    error: null,
  });
  const [, removeProduct] = useFormState(removeProductAction, {
    status: 'initial',
    error: null,
  });

  return (
    <div className={styles.CartManagerItem}>
      <span className={styles.Title}>
        <span className="line-clamp-2" title={product.title}>
          {product.title}
        </span>
      </span>

      <span className={styles.Price}>{formatNumberToUSD(product.price)}</span>

      <div className={styles.QuantityWrapper}>
        <form action={decreaseQuantity}>
          <input type="hidden" name="productId" value={product.id} />
          <DecreaseQuantityButton />
        </form>

        <span className={styles.Value}>{product.quantity}</span>

        <form action={increaseQuantity}>
          <input type="hidden" name="productId" value={product.id} />
          <IncreaseQuantityButton />
        </form>
      </div>

      <span className={styles.TotalPrice}>
        {formatNumberToUSD(product.price * product.quantity)}
      </span>

      <div className={styles.DeleteButtonWrapper}>
        <form action={removeProduct}>
          <input type="hidden" name="productId" value={product.id} />
          <DeleteButton />
        </form>
      </div>
    </div>
  );
}
