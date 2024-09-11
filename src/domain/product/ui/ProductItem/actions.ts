'use server';

import { revalidatePath } from 'next/cache';

import { CartService } from '@/domain/cart/services/CartService';

const cartService = new CartService();

export async function addProductToCart(productId: number) {
  await cartService.addProductToCart(productId);

  revalidatePath('/', 'layout');
}
