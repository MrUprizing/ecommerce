"use client";
import * as React from "react";
import { products } from "@/data/products";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface FilterOption {
  label: string;
  value: "latest" | "low-high" | "high-low";
}

const filterOptions: FilterOption[] = [
  { label: "Latest Arrivals", value: "latest" },
  { label: "Price: Low → High", value: "low-high" },
  { label: "Price: High → Low", value: "high-low" },
];

function sortProducts(
  products: Product[],
  filter: FilterOption["value"],
): Product[] {
  switch (filter) {
    case "low-high":
      return [...products].sort((a, b) => a.price - b.price);
    case "high-low":
      return [...products].sort((a, b) => b.price - a.price);
    default:
      return [...products].sort((a, b) => b.id - a.id);
  }
}

function StoreSidebar({
  selected,
  onSelect,
}: {
  selected: FilterOption["value"];
  onSelect: (value: FilterOption["value"]) => void;
}) {
  return (
    <aside className="sticky top-24 self-start">
      <nav className="flex flex-col gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`text-left text-muted-foreground px-2 py-1 rounded transition-colors cursor-pointer
              ${
                selected === option.value
                  ? "text-primary font-semibold"
                  : "hover:text-primary"
              }`}
            aria-current={selected === option.value ? "page" : undefined}
          >
            {option.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function StoreGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-lg overflow-hidden bg-card border hover:dark:border-white/30 hover:border-black/20 hover:shadow-lg transition-all  duration-300"
        >
          <Link href={`/product/${product.id}`}>
            <div className="aspect-square relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-contain"
                loading="lazy"
                quality={80}
                style={{ viewTransitionName: `product-${product.id}` }}
              />
            </div>
          </Link>
          <div className="flex justify-between items-center py-3 px-2">
            <h3 className="font-medium text-base">{product.name}</h3>
            <span className="text-sm text-muted-foreground">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StorePage() {
  const [filter, setFilter] = React.useState<FilterOption["value"]>("latest");
  const sortedProducts = React.useMemo(
    () => sortProducts(products, filter),
    [filter],
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/5 mb-6 lg:mb-0">
        <StoreSidebar selected={filter} onSelect={setFilter} />
      </div>
      <section className="w-full">
        <StoreGrid products={sortedProducts} />
      </section>
    </main>
  );
}
