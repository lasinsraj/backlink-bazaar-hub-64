import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const CheckoutButton = () => {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed with checkout",
      });
      navigate("/login");
      return;
    }

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
      <Button 
        onClick={handleCheckout} 
        className="w-full mt-4 bg-primary hover:bg-primary/90"
      >
        Checkout
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete your purchase</DialogTitle>
            <DialogDescription>
              Enter your payment details to complete the order
            </DialogDescription>
          </DialogHeader>
          <Elements stripe={stripePromise}>
            <CheckoutForm 
              total={total} 
              onSuccess={handleSuccess} 
              onClose={() => setIsOpen(false)} 
            />
          </Elements>
        </DialogContent>
      </Dialog>
    </>
  );
};