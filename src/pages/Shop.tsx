import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const products = [
  {
    id: 1,
    name: "Basic Backlink Package",
    price: 99,
    description: "10 high-quality backlinks from reputable sites",
    priceId: "price_basic",
  },
  {
    id: 2,
    name: "Premium Backlink Package",
    price: 199,
    description: "25 high-quality backlinks with detailed reporting",
    priceId: "price_premium",
  },
  {
    id: 3,
    name: "Enterprise Package",
    price: 499,
    description: "50 premium backlinks with monthly support",
    priceId: "price_enterprise",
  },
];

const Shop = () => {
  const { toast } = useToast();

  const handlePurchase = async (priceId: string) => {
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
        description: "Preparing your payment...",
      });

      const response = await fetch('http://localhost:3000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
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
      <h1 className="text-4xl font-bold text-center mb-12">Our Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="p-6">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-3xl font-bold text-primary mb-4">${product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <Button 
              className="w-full"
              onClick={() => handlePurchase(product.priceId)}
            >
              Purchase Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;