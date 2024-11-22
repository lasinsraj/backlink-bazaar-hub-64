import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: { email: string; role?: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string; role?: string } | null>(null);

  const login = async (email: string, password: string) => {
    // Demo authentication logic
    if (email.includes('admin')) {
      setUser({ email, role: 'admin' });
      toast({
        title: "Admin Access Granted",
        description: "You can now access the admin panel at /admin",
      });
    } else {
      setUser({ email, role: 'user' });
    }
  };

  const signup = async (email: string, password: string) => {
    setUser({ email, role: 'user' });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        login, 
        signup, 
        logout, 
        user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};