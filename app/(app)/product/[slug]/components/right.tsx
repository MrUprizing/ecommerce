import { Button } from "@/components/ui/button";

interface ProductRightProps {
  price: number;
  colors: string[];
}

export default function ProductRight({ price, colors }: ProductRightProps) {
  return (
    <div className="space-y-6 md:sticky md:top-35 self-start">
      <div>
        <h3 className="font-medium mb-2">Select Color</h3>
        <div className="grid grid-cols-2 gap-4">
          {colors.map((color) => (
            <Button key={color} variant="outline">
              {color}
            </Button>
          ))}
        </div>
      </div>
      <div className="pt-6">
        <h2 className="text-2xl font-bold">From ${price}</h2>
        <Button variant="outline" className="w-full mt-4 py-6">
          Select variant
        </Button>
      </div>
    </div>
  );
}
