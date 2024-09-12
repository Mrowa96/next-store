import { type CartWithProducts } from '@/domain/cart/types';
import { formatNumberToUSD } from '@/domain/product/utils';

import styles from './CartManagerItem.module.scss';
import { DecreaseQuantityForm } from './components/DecreaseQuantityForm';
import { DeleteProductForm } from './components/DeleteProductForm';
import { IncreaseQuantityForm } from './components/IncreaseQuantityForm';

type Props = {
  product: CartWithProducts['products'][number];
};

export function CartManagerItem({ product }: Props) {
  return (
    <div className={styles.CartManagerItem}>
      <span className={styles.Title}>
        <span className="line-clamp-2" title={product.title}>
          {product.title}
        </span>
      </span>

      <span className={styles.Price}>{formatNumberToUSD(product.price)}</span>

      <div className={styles.QuantityWrapper}>
        <DecreaseQuantityForm productId={product.id} />

        <span className={styles.Value}>{product.quantity}</span>

        <IncreaseQuantityForm productId={product.id} />
      </div>

      <span className={styles.TotalPrice}>
        {formatNumberToUSD(product.price * product.quantity)}
      </span>

      <div className={styles.DeleteButtonWrapper}>
        <DeleteProductForm productId={product.id} />
      </div>
    </div>
  );
}
