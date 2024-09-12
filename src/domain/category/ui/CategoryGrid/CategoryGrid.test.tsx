import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { CategoryGrid } from './CategoryGrid';

describe('<CategoryGrid />', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display title', () => {
    const { getByRole } = render(<CategoryGrid categories={[]} />);

    expect(getByRole('heading', { level: 2 })).toHaveTextContent('Categories');
  });

  it('should display no categories text', () => {
    const { getByText, queryAllByRole } = render(<CategoryGrid categories={[]} />);

    expect(getByText('No categories')).toBeVisible();
    expect(queryAllByRole('link')).toHaveLength(0);
  });

  it('should display no categories text', () => {
    const { queryByText, getAllByRole } = render(<CategoryGrid categories={['a', 'b', 'c']} />);

    expect(queryByText('No categories')).toBeNull();
    expect(getAllByRole('link')).toHaveLength(3);
  });
});
