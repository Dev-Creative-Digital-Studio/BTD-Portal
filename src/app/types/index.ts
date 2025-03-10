import { User } from "@/lib/auth-types";

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

export interface Gift {
  selectedVariations: {
    color: string;
    size: string;
  };
  product: Product;
  price: number;
  vendor: string;
  _id: string;
}

export interface Event {
  _id: string;
  title: string;
  fullDate: string;
  date: number;
  month: number;
  year: number;
  time: string;
  location: string;
  note: string;
  recipientPhone: string;
  recurringEvent: boolean;
  user: string;
}

export interface Order {
  _id: string;
  gifts: Gift[];
  vendor: User;
  amount: number;
  totalAmount: number;
  status: string;
  user: User;
  event: Event;
  createdAt: string;
  updatedAt: string;
}
