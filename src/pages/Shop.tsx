import { ShoppingCart } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { CheckoutButton } from "@/components/shop/CheckoutButton";
import { products } from "@/data/products";

const Shop = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Our Packages</h1>
        <div className="flex items-center gap-4">
          <ShoppingCart className="h-6 w-6" />
          <CheckoutButton />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;