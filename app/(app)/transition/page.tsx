import { Link } from "next-view-transitions";
import Image from "next/image";
export default function HomePage() {
  return (
    <main className="flex flex-col items-center gap-6">
      <Image
        src="/products/bag.webp"
        alt="Demo"
        width={120}
        height={120}
        className="demo rounded"
        priority
      />
      <Link href="/transition/demo" className="underline">
        Ir al demo →
      </Link>
    </main>
  );
}
