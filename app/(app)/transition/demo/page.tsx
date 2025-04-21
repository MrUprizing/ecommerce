import { Link } from "next-view-transitions";
import Image from "next/image";
export default function DemoPage() {
  return (
    <main className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold mb-2">Esto es el demo</h2>
      <Image
        src="/products/bag.webp"
        alt="Demo"
        width={240}
        height={240}
        className="demo rounded"
        priority
      />
      <Link href="/transition" className="underline">
        ← Volver al inicio
      </Link>
    </main>
  );
}
