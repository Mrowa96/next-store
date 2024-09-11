import { type ReactNode } from 'react';

import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import './globals.css';

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
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
