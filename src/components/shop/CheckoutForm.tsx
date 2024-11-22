import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      backgroundColor: '#ffffff',
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: true,
};

interface CheckoutFormProps {
  total: number;
  onSuccess: () => void;
  onClose: () => void;
}

export const CheckoutForm = ({ total, onSuccess, onClose }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your purchase",
        variant: "destructive",
      });
      onClose();
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    try {
      // Create order with "pending" status first
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_email: user.email,
          total_amount: total,
          status: 'pending',
          items: items,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Simulate payment processing for development
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      // In development, we'll simulate a successful payment
      // In production, you would process the actual payment here
      
      // Update order status to completed after successful payment
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', order.id);

      if (updateError) throw updateError;
      
      toast({
        title: "Order Completed!",
        description: "Thank you for your purchase. Your order has been processed successfully.",
      });
      
      onSuccess();
      navigate("/orders");
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-lg bg-white shadow-sm">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span>Processing Fee:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between items-center font-bold text-lg mt-2 pt-2 border-t">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              Processing...
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </span>
          ) : (
            `Pay $${total.toFixed(2)}`
          )}
        </Button>
      </div>
    </form>
  );
};