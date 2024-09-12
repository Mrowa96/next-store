'use server';

import { revalidatePath } from 'next/cache';

import { parseAsync } from 'valibot';

import { CartService } from '@/domain/cart/services/CartService';

import { tryCatch } from '@/infrastructure/tryCatch';

import { productSchema } from './schemas';

type ActionState = {
  status: 'initial' | 'success' | 'error';
  error: string | null;
};

const cartService = new CartService();

export async function addProductToCartAction(
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { result: product, error: parseError } = await tryCatch(() =>
    parseAsync(productSchema, {
      id: Number.parseInt(formData.get('id')?.toString() || '0'),
      title: formData.get('title')?.toString(),
      price: Number.parseFloat(formData.get('price')?.toString() || '0'),
    }),
  );

  if (parseError) {
    return {
      status: 'error',
      error: 'Cannot parse product data.',
    };
  }

  const { error: addError } = await tryCatch(() => cartService.addProductToCart(product));

  if (addError) {
    return {
      status: 'error',
      error: 'Cannot add product to the cart.',
    };
  }

  revalidatePath('/', 'layout');

  return {
    status: 'success',
    error: null,
  };
}
