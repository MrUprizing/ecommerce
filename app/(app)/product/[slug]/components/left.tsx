import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ProductInformation } from "@/types/product";
import { ArrowLeft, Package, RefreshCw } from "lucide-react";

interface ProductLeftProps {
  name: string;
  description: string;
  information: ProductInformation;
}

export function ProductLeft({
  name,
  description,
  information,
}: ProductLeftProps) {
  return (
    <div className="space-y-6 lg:sticky lg:top-35 self-start">
      <div>
        <p>Latest Drops</p>
        <h1 className="text-3xl font-bold mt-4">{name}</h1>
        <p className="mt-4 text-muted-foreground">{description}</p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer text-base">
            Product Information
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1">
              <li className="text-muted-foreground">
                <span className="text-primary">Material:</span>{" "}
                {information.material}
              </li>
              <li className="text-muted-foreground">
                <span className="text-primary">Weight:</span>{" "}
                {information.weight}
              </li>
              <li className="text-muted-foreground">
                <span className="text-primary">Country of Origin:</span>{" "}
                {information.countryOfOrigin}
              </li>
              <li className="text-muted-foreground">
                <span className="text-primary">Dimensions:</span>{" "}
                {information.dimensions}
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="cursor-pointer text-base">
            Shipping and Returns
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-w-3xl mx-auto py-2 px-2 space-y-4">
              <div className="flex items-start gap-2">
                <Package className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Fast delivery</h3>
                  <p className="text-muted-foreground">
                    Your package will arrive in 3-5 business days at your pick
                    up location or in the comfort of your home.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <RefreshCw className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Simple exchanges</h3>
                  <p className="text-muted-foreground">
                    Is the fit not quite right? No worries - we'll exchange your
                    product for a new one.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ArrowLeft className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Easy returns</h3>
                  <p className="text-muted-foreground">
                    Just return your product and we'll refund your money. No
                    questions asked – we'll do our best to make sure your return
                    is hassle-free.
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
