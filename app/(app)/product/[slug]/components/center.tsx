import Image from "next/image";
interface ProductCenterProps {
  image: string;
  id: number;
}
export default function ProductCenter({ image, id }: ProductCenterProps) {
  return (
    <div className="bg-card border rounded-lg p-4 flex items-center justify-center h-full w-full min-h-[350px] md:min-h-[700px] lg:min-h-[750px]">
      <div className="relative aspect-square w-full max-w-[700px]">
        <Image
          src={image}
          alt="Audio Arrogance AuralElite Headphones"
          fill
          className="object-contain"
          priority
          style={{ viewTransitionName: `product-${id}` }}
        />
      </div>
    </div>
  );
}
