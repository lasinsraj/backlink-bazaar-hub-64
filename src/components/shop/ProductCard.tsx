import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
        <CardTitle>{product.name}</CardTitle>
        <CardDescription className="text-3xl font-bold text-primary">
          ${product.price}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 mb-4">{product.description}</p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          {product.details.map((detail, index) => (
            <li key={index} className="text-gray-600">{detail}</li>
          ))}
        </ul>
        
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Reviews</h4>
          {product.reviews.map((review, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.author}</span>
                <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
              </div>
              <p className="text-gray-600 text-sm">{review.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};