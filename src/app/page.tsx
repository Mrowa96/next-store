import { getAllCategories } from '@/domain/category/repository';
import { CategoryGrid } from '@/domain/category/ui/CategoryGrid';

export default async function HomePage() {
  const categories = await getAllCategories();

  return <CategoryGrid categories={categories} />;
}
