import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_email', user?.email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-bold">${order.total_amount}</p>
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Items:</h3>
                <ul className="space-y-2">
                  {order.items.map((item: any, index: number) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Status: <span className="font-medium">{order.status}</span>
                </p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <p className="text-gray-500">No orders yet.</p>
        </Card>
      )}
    </div>
  );
};

export default Orders;