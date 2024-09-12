'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { deleteProductAction } from '@/domain/cart/actions';

import { Button } from '@/ui/Button';

type Props = {
  productId: number;
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="critical" disabled={pending}>
      Delete
    </Button>
  );
}

export function DeleteProductForm({ productId }: Props) {
  const [, deleteProduct] = useFormState(deleteProductAction, {
    status: 'initial',
    error: null,
  });

  return (
    <form action={deleteProduct}>
      <input type="hidden" name="productId" value={productId} />
      <DeleteButton />
    </form>
  );
}
