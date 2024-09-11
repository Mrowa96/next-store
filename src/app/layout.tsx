import { type ReactNode } from 'react';

import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Link from 'next/link';

import { CartService } from '@/domain/cart/services/CartService';

import { baseTitle } from '@/infrastructure/metadata';

import './globals.scss';
import styles from './layout.module.css';

type Props = {
  children: ReactNode;
};

const openSans = Open_Sans({ subsets: ['latin'] });
const cartService = new CartService();

export const metadata: Metadata = {
  title: baseTitle,
  description: 'Buy amazing stuff in our store!',
};

export default async function RootLayout({ children }: Props) {
  const productsInCartQuantity = await cartService.getProductsQuantityInCart();

  return (
    <html lang="en">
      <body className={openSans.className}>
        <header className={styles.Header}>
          <Link href="/" title="Go to homepage" className={styles.LogoLink}>
            <h1>Next Store</h1>
          </Link>

          <Link href="/cart" title="Go to cart" className={styles.CartLink}>
            Cart ({productsInCartQuantity})
          </Link>
        </header>
        <main className={styles.MainContent}>{children}</main>
      </body>
    </html>
  );
}
