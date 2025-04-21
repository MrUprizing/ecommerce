import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "next-view-transitions";

export default function LatestDrops() {
  const products = [
    {
      id: 1,
      name: "Audio Arrogance AuralElite",
      price: 249.0,
      image: "/headphones.webp",
    },
    {
      id: 2,
      name: "Pinnacle Posh Pack",
      price: 405.0,
      image: "/bag.webp",
    },
    {
      id: 3,
      name: "Vinyl Virtuoso Opulenza",
      price: 699.0,
      image: "/turntable.webp",
    },
  ];

  return (
    <div className="w-full px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Latest Drops</h2>
        <Link
          href="/products"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
        >
          View all <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="rounded-lg overflow-hidden">
            <Link href={`/products/${product.id}`}>
              <div className="bg-card border rounded-lg aspect-square relative hover:dark:border-white hover:border-black/30 hover:shadow-lg transition-all  duration-300">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="flex justify-between items-center py-3">
              <h3 className="text-base font-medium">{product.name}</h3>
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
