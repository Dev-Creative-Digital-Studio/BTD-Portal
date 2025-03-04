export interface Product {
  _id: number | undefined;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  category: string;
  orderMinDays: number;
  orderMaxDays: number;
  colorVariations?: string[];
  sizeVariations?: string[];
  images?: string[];
  files?: File[];
}
