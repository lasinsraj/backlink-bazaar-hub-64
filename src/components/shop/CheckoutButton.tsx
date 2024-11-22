import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const CheckoutButton = () => {
  const { items, total } = useCart();
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

      toast({
        title: "Processing",
        description: "Preparing your checkout...",
      });

      // Create line items from cart items
      const lineItems = items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: 1,
      }));

      // Convert the data to URL-encoded format
      const formData = new URLSearchParams();
      formData.append('payment_method_types[]', 'card');
      formData.append('mode', 'payment');
      formData.append('success_url', `${window.location.origin}/success`);
      formData.append('cancel_url', `${window.location.origin}/cancel`);
      
      // Append line items
      lineItems.forEach((item, index) => {
        formData.append(`line_items[${index}][price_data][currency]`, item.price_data.currency);
        formData.append(`line_items[${index}][price_data][product_data][name]`, item.price_data.product_data.name);
        formData.append(`line_items[${index}][price_data][unit_amount]`, item.price_data.unit_amount.toString());
        formData.append(`line_items[${index}][quantity]`, '1');
      });

      const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`,
        },
        body: formData,
      });

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
    <div className="flex items-center gap-4">
      <span className="font-bold">Total: ${total}</span>
      <Button onClick={handleCheckout} variant="default">
        Checkout
      </Button>
    </div>
  );
};