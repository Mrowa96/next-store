import { type ReactNode, Suspense } from 'react';

import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Link from 'next/link';

import { CartLink } from '@/domain/cart/ui/CartLink';

import { baseTitle } from '@/infrastructure/metadata';

import './globals.scss';
import styles from './layout.module.css';

type Props = {
  children: ReactNode;
};

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: baseTitle,
  description: 'Buy amazing stuff in our store!',
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <header className={styles.Header}>
          <Link href="/" title="Go to homepage" className={styles.LogoLink}>
            <h1>Next Store</h1>
          </Link>

          {/* Just as example how to handle slow data fethcing on server */}
          <Suspense>
            <CartLink />
          </Suspense>
        </header>
        <main className={styles.MainContent}>{children}</main>
      </body>
    </html>
  );
}
