'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { increaseProductQuantityAction } from '@/domain/cart/actions';

import { Button } from '@/ui/Button';

type Props = {
  productId: number;
};

function IncreaseQuantityButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="secondary" shape="round" disabled={pending}>
      +
    </Button>
  );
}

export function IncreaseQuantityForm({ productId }: Props) {
  const [, increaseQuantity] = useFormState(increaseProductQuantityAction, {
    status: 'initial',
    error: null,
  });

  return (
    <form action={increaseQuantity}>
      <input type="hidden" name="productId" value={productId} />
      <IncreaseQuantityButton />
    </form>
  );
}
