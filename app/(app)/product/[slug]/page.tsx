import { products } from "@/data/products";
import type { Product } from "@/types/product";
import { notFound, redirect } from "next/navigation";
import ProductCenter from "./components/center";
import { ProductLeft } from "./components/left";
import ProductRight from "./components/right";

interface PageProps {
  params: { slug: string };
}

function getProductById(id: string): Product | undefined {
  const productId = Number(id);
  return products.find((product) => product.id === productId);
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const product = getProductById(slug);
  if (!product) {
    notFound();
  }
  return (
    <div className="w-full px-4 pt-6 sm:px-6 sm:pt-8">
      <div className="grid gap-20 grid-cols-1 lg:[grid-template-columns:1fr_2fr_1fr]">
        <ProductLeft
          name={product.name}
          description={product.metadata.description}
          information={product.metadata.information}
        />
        <ProductCenter image={product.image} />
        <ProductRight price={product.price} colors={product.metadata.colors} />
      </div>
    </div>
  );
}
