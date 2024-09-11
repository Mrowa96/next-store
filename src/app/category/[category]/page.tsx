type Props = {
  params: {
    category: string;
  };
};

export default async function CategoryPage({ params: { category } }: Props) {
  return (
    <>
      <h2>{decodeURIComponent(category)}</h2>
    </>
  );
}
