import { formatNumberToUSD } from '@/domain/product/utils';

import { type CartWithProducts } from '../../types';
import styles from './CartManager.module.scss';
import { CartManagerItem } from './components/CartManagerItem';

type Props = {
  cart: CartWithProducts | null;
  totalCost: number;
};

export function CartManager({ cart, totalCost }: Props) {
  return (
    <div className={styles.CartManager}>
      <h2 className={styles.Title}>Cart</h2>
      {!cart || cart.products.length === 0 ? (
        <p className={styles.EmptyMessage}>Cart is empty, time to shop!</p>
      ) : (
        <>
          <div className={styles.Header}>
            <span className={styles.TitleHeader}>Title</span>
            <span className={styles.PriceHeader}>Price</span>
            <span className={styles.QuantityHeader}>Quantity</span>
            <span className={styles.TotalPriceHeader}>Total price</span>
            <span className={styles.ActionHeader}>&nbsp;</span>
          </div>
          <div className={styles.Items}>
            {cart.products.map((product) => (
              <CartManagerItem key={product.id} product={product} />
            ))}
          </div>
          <div className={styles.TotalCost}>
            Total:
            <span className={styles.Value}>{formatNumberToUSD(totalCost)}</span>
          </div>
        </>
      )}
    </div>
  );
}
