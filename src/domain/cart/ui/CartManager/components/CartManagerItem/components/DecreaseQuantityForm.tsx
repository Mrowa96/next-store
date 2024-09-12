'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { FiMinus } from 'react-icons/fi';

import { decreaseProductQuantityAction } from '@/domain/cart/actions';

import { Button } from '@/ui/Button';

type Props = {
  productId: number;
};

function DecreaseQuantityButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="secondary" shape="round" disabled={pending}>
      <FiMinus />
    </Button>
  );
}

export function DecreaseQuantityForm({ productId }: Props) {
  const [, decreaseQuantity] = useFormState(decreaseProductQuantityAction, {
    status: 'initial',
    error: null,
  });

  return (
    <form action={decreaseQuantity}>
      <input type="hidden" name="productId" value={productId} />
      <DecreaseQuantityButton />
    </form>
  );
}
