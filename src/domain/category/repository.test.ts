import { describe, expect, it, vi } from 'vitest';

import { safeFetch } from '@/infrastructure/safeFetch';

import { getAllCategories } from './repository';

vi.mock(import('@/infrastructure/safeFetch'), async () => ({
  safeFetch: vi.fn(),
}));

describe('category repository', () => {
  it('[getAllCategories] should return array with items', async () => {
    const mockedData = ['a', 'b', 'c'];

    vi.mocked(safeFetch).mockImplementationOnce(async () => ({
      isOk: true,
      status: 200,
      data: mockedData,
      error: null,
    }));

    const result = await getAllCategories();

    expect(result).toEqual(mockedData);
  });

  it('[getAllCategories] should return empy array if fetch will fail for any reason', async () => {
    vi.mocked(safeFetch).mockImplementationOnce(async () => ({
      isOk: false,
      status: 200,
      data: null,
      error: new Error('test'),
    }));

    const result = await getAllCategories();

    expect(result).toEqual([]);
  });
});
