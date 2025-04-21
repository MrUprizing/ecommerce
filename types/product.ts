export interface ProductInformation {
  material: string;
  weight: string;
  countryOfOrigin: string;
  dimensions: string;
}

export interface ProductMetadata {
  description: string;
  information: ProductInformation;
  colors: string[];
}

export interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  hero: number;
  metadata: ProductMetadata;
}
