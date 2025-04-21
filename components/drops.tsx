import { ArrowUpRight } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  hero: number;
};

type LatestDropsProps = {
  products: Product[];
  hero: number;
  title?: string;
};

export default function Drops({ products, hero, title }: LatestDropsProps) {
  const filteredProducts = products.filter((product) => product.hero === hero);

  return (
    <div className="w-full px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">{title}</h2>
        <Link
          href="/products"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
        >
          View all <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="rounded-lg overflow-hidden">
            <Link prefetch={true} href={`/product/${product.id}`}>
              <div className="bg-card border rounded-lg aspect-square relative hover:dark:border-white/30 hover:border-black/20 hover:shadow-lg transition-all  duration-300">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="flex justify-between items-center py-3 px-1.5">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-base text-gray-500">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
