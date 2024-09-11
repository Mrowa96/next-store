import { type Metadata, type ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllCategories } from '@/domain/category/repository';
import { getAllProductsInCategory } from '@/domain/product/repository';
import { ProductGrid } from '@/domain/product/ui/ProductGrid';

type Props = {
  params: {
    category: string;
  };
};

export async function generateMetadata(
  { params: { category } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentTitle = (await parent).title;

  if (!parentTitle?.absolute) {
    throw new Error('Parent title has to be set');
  }

  return {
    title: `${parentTitle.absolute} - ${category}`,
  };
}

export default async function CategoryPage({ params: { category } }: Props) {
  const categories = await getAllCategories();
  const parsedCategory = decodeURIComponent(category);

  if (!categories.includes(parsedCategory)) {
    return notFound();
  }

  const products = await getAllProductsInCategory(category);

  return <ProductGrid products={products} category={parsedCategory} />;
}
