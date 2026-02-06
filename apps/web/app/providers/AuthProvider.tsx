'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../../server/user';
import { SelectedImagesProvider } from '../../context';
import Navigation from '../../components/navbarbeforelogin';

type AuthContextType = {
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const user = await getCurrentUser();
      setUserId(user?.sub ?? null);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUserId(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      await refreshUser();
      setLoading(false);
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ userId, setUserId, refreshUser }}>
      <SelectedImagesProvider>
        {userId === null && <Navigation />}
        {children}
      </SelectedImagesProvider>
    </AuthContext.Provider>
  );
}