import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ total, onSuccess }: { total: number; onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Mock successful payment for development
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
      
      toast({
        title: "Success",
        description: "Payment processed successfully!",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Payment failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-md">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">Total: ${total}</span>
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing}
          className="bg-primary hover:bg-primary/90"
        >
          {isProcessing ? "Processing..." : `Pay $${total}`}
        </Button>
      </div>
    </form>
  );
};

export const CheckoutButton = () => {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }
    setIsOpen(true);
  };

  const handleSuccess = () => {
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleCheckout} variant="default">
        Checkout
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete your purchase</DialogTitle>
          </DialogHeader>
          <Elements stripe={stripePromise}>
            <CheckoutForm total={total} onSuccess={handleSuccess} />
          </Elements>
        </DialogContent>
      </Dialog>
    </>
  );
};