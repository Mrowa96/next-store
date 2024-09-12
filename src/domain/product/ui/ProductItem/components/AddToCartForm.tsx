'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { Button } from '@/ui/Button';

import { addProductToCartAction } from '../../../actions';
import { type Product } from '../../../types';

type Props = {
  product: Product;
};

function AddToCartButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Add to cart
    </Button>
  );
}

export function AddToCartForm({ product }: Props) {
  const [, addTProductToCart] = useFormState(addProductToCartAction, {
    status: 'initial',
    error: null,
  });

  return (
    <form action={addTProductToCart}>
      <input type="hidden" name="id" value={product.id} />
      <input type="hidden" name="title" value={product.title} />
      <input type="hidden" name="price" value={product.price} />

      <AddToCartButton />
    </form>
  );
}
