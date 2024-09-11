import { type ReactNode } from 'react';

import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Link from 'next/link';

import './globals.css';
import styles from './layout.module.css';

type Props = {
  children: ReactNode;
};

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Store',
  description: 'Buy amazing stuff in our store!',
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <header className={styles.Header}>
          <Link href="/" title="Go to homepage" className={styles.LogoLink}>
            <h1>Next Store</h1>
          </Link>

          <Link href="/cart" title="Go to cart" className={styles.CartLink}>
            Cart
          </Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
