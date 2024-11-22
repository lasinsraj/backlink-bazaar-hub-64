import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/components/ui/use-toast";

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

      toast({
        title: "Processing",
        description: "Preparing your payment...",
      });

      // Mock successful checkout session for development
      const mockSession = {
        id: 'mock_session_' + Date.now(),
      };

      const result = await stripe.redirectToCheckout({
        sessionId: mockSession.id,
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
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center animate-fade-in">
          <h1 className="mb-4 md:mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 animate-scale-in">
            Boost Your Rankings with
            <span className="text-primary block md:inline animate-pulse"> Premium Backlinks</span>
          </h1>
          <p className="mx-auto mb-6 md:mb-8 max-w-2xl text-lg md:text-xl text-gray-600 animate-fade-in px-4">
            Get high-quality, keyword-targeted backlinks from authoritative websites.
            Improve your SEO and drive more organic traffic to your website.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 animate-slide-in-right px-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 hover-scale w-full md:w-auto"
              onClick={handlePayment}
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="hover-scale w-full md:w-auto"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2">
        <div className="h-[300px] md:h-[600px] w-[300px] md:w-[600px] rounded-full bg-primary/5 blur-3xl animate-float"></div>
      </div>
    </div>
  );
};