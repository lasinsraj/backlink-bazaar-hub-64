import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductsAdmin } from "@/components/admin/ProductsAdmin";
import { ContentAdmin } from "@/components/admin/ContentAdmin";
import { DashboardMetrics } from "@/components/admin/DashboardMetrics";

const Admin = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <DashboardMetrics />
        </TabsContent>

        <TabsContent value="products">
          <ProductsAdmin />
        </TabsContent>

        <TabsContent value="content">
          <ContentAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;