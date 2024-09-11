import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { ProductItem } from './ProductItem';

const dummyProduct = {
  id: 1,
  title: 'Product A',
  price: 99.99,
  image: 'https://dummyimage.com/600x400/000/fff',
};

describe('<ProductItem />', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display title', () => {
    const { getByRole } = render(<ProductItem product={dummyProduct} />);

    expect(getByRole('heading', { level: 3 })).toHaveTextContent(dummyProduct.title);
  });

  it('should display price', () => {
    const { getByTestId } = render(<ProductItem product={dummyProduct} />);

    expect(getByTestId('product-item-price')).toHaveTextContent('$99.99');
  });

  it('should have add to card button', () => {
    const { getByRole } = render(<ProductItem product={dummyProduct} />);

    expect(getByRole('button')).toHaveTextContent('Add to cart');
  });

  it('should have image if defined', () => {
    const { getByRole } = render(<ProductItem product={dummyProduct} />);

    expect(getByRole('img')).toBeVisible();
  });

  it('should not have image if not defined', () => {
    const { queryByRole } = render(<ProductItem product={{ ...dummyProduct, image: undefined }} />);

    expect(queryByRole('img')).toBeNull();
  });
});
