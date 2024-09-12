'use server';

import { revalidatePath } from 'next/cache';

import { CartService } from '@/domain/cart/services/CartService';

import { type Product } from './types';

const cartService = new CartService();

export async function addProductToCart(product: Product) {
  await cartService.addProductToCart(product);

  revalidatePath('/', 'layout');
}
