import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const CheckoutButton = () => {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();

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

      // Mock successful payment for development
      toast({
        title: "Success",
        description: "Payment processed successfully!",
      });
      
      // Clear the cart after successful payment
      clearCart();
      
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
    <div className="flex items-center gap-4">
      <span className="font-bold">Total: ${total}</span>
      <Button onClick={handleCheckout} variant="default">
        Checkout
      </Button>
    </div>
  );
};