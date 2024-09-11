import { type Category } from '../../../category/types';
import { type ProductArray } from '../../types';
import { ProductItem } from '../ProductItem';
import styles from './ProductGrid.module.scss';

type Props = {
  products: ProductArray;
  category: Category;
};

export function ProductGrid({ products, category }: Props) {
  return (
    <div className={styles.ProductGrid}>
      <div className={styles.Header}>
        <h2 className={styles.Title}>Products in {category}</h2>
        <span className={styles.Quantity}>
          {products.length} {products.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className={styles.Content}>
        {products.length === 0 ? (
          <p className={styles.NoProductsMessage}>No products</p>
        ) : (
          <>
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
