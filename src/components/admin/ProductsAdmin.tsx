import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ProductsAdmin = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "500+ Backlink Package",
      price: 499,
      description: "Basic backlink package with 500+ quality backlinks",
    },
    {
      id: 2,
      name: "1500+ Backlink Package",
      price: 999,
      description: "Advanced backlink package with 1500+ quality backlinks",
    },
    {
      id: 3,
      name: "2500+ Backlink Package",
      price: 1499,
      description: "Premium backlink package with 2500+ quality backlinks",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell className="max-w-md truncate">
                {product.description}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};