import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type Product } from '../../types';
import { ProductGrid } from './ProductGrid';

// We have to mock because of problem with useFormState
vi.mock('../ProductItem', () => ({
  ProductItem: () => <div data-testid="product-item"></div>,
}));

describe('<ProductGrid />', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display title', () => {
    const { getByRole } = render(<ProductGrid products={[{ id: 1 } as Product]} category="Test" />);

    expect(getByRole('heading', { level: 2 })).toHaveTextContent('Products in Test');
  });

  it.each([
    { input: [], output: '0 items' },
    { input: [{ id: 1 }] as Product[], output: '1 item' },
    { input: [{ id: 1 }, { id: 2 }] as Product[], output: '2 items' },
  ])('should display quantity information', ({ input, output }) => {
    const { getByText } = render(<ProductGrid products={input} category="Test" />);

    expect(getByText(output)).toBeVisible();
  });

  it('should display no product message', () => {
    const { getByText } = render(<ProductGrid products={[]} category="Test" />);

    expect(getByText('No products')).toBeVisible();
  });

  it('should display product items', () => {
    const { queryByText, getAllByTestId } = render(
      <ProductGrid products={[{ id: 1, title: 'Product A', price: 100 }]} category="Test" />,
    );

    expect(queryByText('No products')).toBeNull();
    expect(getAllByTestId('product-item')).toHaveLength(1);
  });
});
