import Link from 'next/link';

import { FiShoppingCart } from 'react-icons/fi';

import { CartService } from '@/domain/cart/services/CartService';

import styles from './CartLink.module.css';

const cartService = new CartService();

export async function CartLink() {
  const productsInCartQuantity = await cartService.getProductsQuantityInCart();

  return (
    <Link href="/cart" title="Go to cart" className={styles.CartLink}>
      <FiShoppingCart />
      Cart ({productsInCartQuantity})
    </Link>
  );
}
