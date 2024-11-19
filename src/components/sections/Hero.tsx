import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/components/ui/use-toast";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const Hero = () => {
  const { toast } = useToast();

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        toast({
          title: "Error",
          description: "Stripe failed to initialize. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      // Show loading state to user
      toast({
        title: "Processing",
        description: "Preparing your payment...",
      });

      // Create a checkout session
      const response = await fetch('http://localhost:3000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_H5ggYwtDq4fbrJ', // Replace with your actual price ID from Stripe
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const session = await response.json();

      // Redirect to Stripe checkout
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
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center animate-fade-in">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-scale-in">
            Boost Your Rankings with
            <span className="text-primary animate-pulse"> Premium Backlinks</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 animate-fade-in">
            Get high-quality, keyword-targeted backlinks from authoritative websites.
            Improve your SEO and drive more organic traffic to your website.
          </p>
          <div className="flex justify-center gap-4 animate-slide-in-right">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 hover-scale"
              onClick={handlePayment}
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="hover-scale">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl animate-float"></div>
      </div>
    </div>
  );
};