import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="font-medium">Email</label>
            <p>{user.email}</p>
          </div>
          <Button onClick={() => navigate("/settings")}>Edit Profile</Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;