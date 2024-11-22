import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const products = [
  {
    id: 1,
    name: "Basic Backlink Package",
    price: 99,
    description: "Perfect for small businesses and startups looking to establish their online presence.",
    details: [
      "10 high-quality backlinks from reputable sites",
      "Domain authority checking",
      "Monthly report",
      "24/7 support"
    ],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    priceId: "price_basic",
    reviews: [
      { author: "John D.", rating: 5, text: "Great service, saw results within weeks!" },
      { author: "Sarah M.", rating: 4, text: "Good value for money" }
    ]
  },
  {
    id: 2,
    name: "Premium Backlink Package",
    price: 199,
    description: "Comprehensive package for growing businesses seeking to boost their SEO performance.",
    details: [
      "25 high-quality backlinks with detailed reporting",
      "Competitor analysis",
      "Weekly progress updates",
      "Priority support"
    ],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    priceId: "price_premium",
    reviews: [
      { author: "Mike R.", rating: 5, text: "Exceeded expectations!" },
      { author: "Lisa K.", rating: 5, text: "Fantastic results" }
    ]
  },
  {
    id: 3,
    name: "Enterprise Package",
    price: 499,
    description: "Advanced SEO solution for established businesses aiming for market leadership.",
    details: [
      "50 premium backlinks with monthly support",
      "Advanced SEO strategy",
      "Custom reporting dashboard",
      "Dedicated account manager"
    ],
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    priceId: "price_enterprise",
    reviews: [
      { author: "David W.", rating: 5, text: "Best investment in our SEO strategy" },
      { author: "Emma T.", rating: 4, text: "Professional service" }
    ]
  }
];

const Shop = () => {
  const { toast } = useToast();
  const { addToCart, items, total } = useCart();

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        toast({
          title: "Error",
          description: "Payment system unavailable. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Processing",
        description: "Preparing your checkout...",
      });

      const response = await fetch('http://localhost:3000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          items: items.map(item => ({
            priceId: products.find(p => p.id === item.id)?.priceId,
            quantity: item.quantity
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const session = await response.json();
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Our Packages</h1>
        <div className="flex items-center gap-4">
          <ShoppingCart className="h-6 w-6" />
          <span className="font-bold">Total: ${total}</span>
          {items.length > 0 && (
            <Button onClick={handleCheckout} variant="default">
              Checkout
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col h-full">
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
              <Button 
                className="w-full"
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                  });
                  toast({
                    title: "Added to cart",
                    description: `${product.name} has been added to your cart.`,
                  });
                }}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;