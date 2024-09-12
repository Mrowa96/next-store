'use server';

import { revalidatePath } from 'next/cache';

import { tryCatch } from '@/infrastructure/tryCatch';

import { CartService } from './services/CartService';

const cartService = new CartService();

type ActionState = {
  status: 'initial' | 'success' | 'error';
  error: string | null;
};

export async function increaseProductQuantityAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const productId = Number.parseInt(formData.get('productId')?.toString() || '0');

  const { result, error } = await tryCatch(() =>
    cartService.changeProductQuantityInCart(productId, 'increase'),
  );

  if (result) {
    revalidatePath('/', 'layout');

    return {
      status: 'success',
      error: null,
    };
  }

  console.error(error);

  return {
    status: 'error',
    error: 'Cannot increase product quantity.',
  };
}

export async function decreaseProductQuantityAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const productId = Number.parseInt(formData.get('productId')?.toString() || '0');

  const { result, error } = await tryCatch(() =>
    cartService.changeProductQuantityInCart(productId, 'decrease'),
  );

  if (result) {
    revalidatePath('/', 'layout');

    return {
      status: 'success',
      error: null,
    };
  }

  console.error(error);

  return {
    status: 'error',
    error: 'Cannot decrease product quantity.',
  };
}

export async function removeProductAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const productId = Number.parseInt(formData.get('productId')?.toString() || '0');

  const { result, error } = await tryCatch(() => cartService.removeProductFromCart(productId));

  if (result) {
    revalidatePath('/', 'layout');

    return {
      status: 'success',
      error: null,
    };
  }

  console.error(error);

  return {
    status: 'error',
    error: 'Cannot remove product.',
  };
}
