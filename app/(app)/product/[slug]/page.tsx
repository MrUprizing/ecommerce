import { products } from "@/data/products";
import type { Product } from "@/types/product";
import { notFound, redirect } from "next/navigation";
import ProductCenter from "./components/center";
import Features from "./components/features";
import { ProductLeft } from "./components/left";
import ProductRight from "./components/right";

function getProductById(id: string): Product | undefined {
  const productId = Number(id);
  return products.find((product) => product.id === productId);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
        <ProductCenter image={product.image} id={product.id} />
        <ProductRight price={product.price} colors={product.metadata.colors} />
      </div>
      <Features />
    </div>
  );
}
