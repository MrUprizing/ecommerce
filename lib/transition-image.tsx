import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductImageTransitionProps {
  product: Product;
  priority?: boolean;
}

export function TransitionImage({
  product,
  priority,
}: ProductImageTransitionProps) {
  return (
    <Image
      src={product.image}
      alt={product.name}
      fill
      className="object-contain"
      style={{ viewTransitionName: `product-${product.id}` }}
      priority={priority}
    />
  );
}
