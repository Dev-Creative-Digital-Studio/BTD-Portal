"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/app/types";

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Product) => void;
}

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [category, setCategory] = useState(product?.category || "");
  const [stock, setStock] = useState(product?.stock?.toString() || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: product?.id ? product.id : undefined,
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="home">Home & Garden</SelectItem>
            <SelectItem value="books">Books</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="stock">Stock</Label>
        <Input
          id="stock"
          type="number"
          placeholder="Enter stock quantity"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>
      <Button type="submit">
        {product ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
}
