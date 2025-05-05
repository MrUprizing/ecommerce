import { products } from "@/data/products";
import type { Product } from "@/types/product";
import { notFound } from "next/navigation";
import ProductCenter from "./components/center";
import FAQs from "./components/faqs";
import { ProductLeft } from "./components/left";
import ProductRight from "./components/right";
import type { Metadata } from "next";

function getProductById(id: string): Product | undefined {
  const productId = Number(id);
  return products.find((product) => product.id === productId);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductById(slug);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product does not exist.",
    };
  }
  return {
    title: product.name,
    description: product.metadata.description,
  };
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
      <FAQs />
    </div>
  );
}
