import { safeFetch } from '@/infrastructure/safeFetch';

import { categoryArraySchema } from './schemas';

export async function getAllCategories() {
  const result = await safeFetch(
    'https://fakestoreapi.com/products/categories',
    {
      successSchema: categoryArraySchema,
    },
    {
      method: 'GET',
    },
  );

  if (result.isOk) {
    return result.data.map((item) => decodeURIComponent(item));
  }

  return [];
}
