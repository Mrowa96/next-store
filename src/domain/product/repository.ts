import { safeFetch } from '@/infrastructure/safeFetch';

import { productArraySchema } from './schemas';

export async function getAllProductsInCategory(category: string) {
  const { isOk, data } = await safeFetch(
    `https://fakestoreapi.com/products/category/${category}`,
    {
      successSchema: productArraySchema,
    },
    {
      method: 'GET',
    },
  );
  if (isOk) {
    return data;
  }

  return [];
}
