import Image from "next/image";
interface ProductCenterProps {
  image: string;
  id: number;
}
export default function ProductCenter({ image, id }: ProductCenterProps) {
  return (
    <div className="bg-card border rounded-lg flex items-center justify-center p-4 h-full w-full min-h-[350px] md:min-h-[500px] lg:min-h-[700px]">
      <Image
        src={image}
        alt="Audio Arrogance AuralElite Headphones"
        width={1000}
        height={1000}
        className="object-contain w-full h-full"
        priority
        style={{ viewTransitionName: `product-${id}` }}
      />
    </div>
  );
}
