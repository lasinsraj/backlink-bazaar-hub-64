import { ShoppingCart } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { CheckoutButton } from "@/components/shop/CheckoutButton";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Shop = () => {
  const { items, total, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Our Packages</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-bold">${total.toFixed(2)}</span>
              <span className="bg-primary text-white rounded-full px-2 py-1 text-xs">
                {items.length}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8">
              {items.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    {isAuthenticated ? (
                      <CheckoutButton />
                    ) : (
                      <Button 
                        className="w-full mt-4"
                        onClick={() => navigate("/login")}
                      >
                        Login to Checkout
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
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