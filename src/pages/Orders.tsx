import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <Card className="p-6">
        <p className="text-gray-500">No orders yet.</p>
      </Card>
    </div>
  );
};

export default Orders;