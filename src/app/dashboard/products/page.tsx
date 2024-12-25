"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "../../../../components/product-form";
import { Product } from "@/app/types";

const initialProducts = [
  {
    id: 1,
    name: "Product 1",
    description: "This is product 1",
    price: 19.99,
    stock: 50,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is product 2",
    price: 29.99,
    stock: 30,
    category: "Clothing",
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is product 3",
    price: 39.99,
    stock: 20,
    category: "Home & Garden",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>();

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct?.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: number | undefined) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleAddProduct} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => setEditingProduct(product)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    {editingProduct && (
                      <ProductForm
                        product={editingProduct}
                        onSubmit={handleEditProduct}
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
