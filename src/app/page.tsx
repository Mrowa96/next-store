import { getAllCategories } from '@/domain/category/repository';
import { CategoryGrid } from '@/domain/category/ui/CategoryGrid';

export const dynamic = 'error';

export default async function HomePage() {
  const categories = await getAllCategories();

  return <CategoryGrid categories={categories} />;
}
