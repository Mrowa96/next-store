import Link from 'next/link';

import { getAllCategories } from '@/domain/category/repository';

export const dynamic = 'error';

export default async function HomePage() {
  const categories = await getAllCategories();

  if (!categories.length) {
    return <p>No categories</p>;
  }

  return (
    <ul>
      {categories.map((category) => (
        <li key={category}>
          <Link href={`/category/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
  );
}
