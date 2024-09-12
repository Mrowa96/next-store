import Link from 'next/link';

import { type CategoryArray } from '../../types';
import styles from './CategoryGrid.module.scss';

type Props = {
  categories: CategoryArray;
};

export function CategoryGrid({ categories }: Props) {
  return (
    <div className={styles.CategoryGrid}>
      <h2 className={styles.Title}>Categories</h2>
      <div className={styles.Content}>
        {categories.length === 0 ? (
          <p className={styles.NoCategoriesMessage}>No categories</p>
        ) : (
          <>
            {categories.map((category) => (
              <Link key={category} href={`/category/${category}`} className={styles.CategoryLink}>
                <span className="line-clamp-1">{category}</span>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
