'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../../server/user';
import { SelectedImagesProvider } from '../../context';
import Navigation from '../../components/navbarbeforelogin';

type AuthContextType = {
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
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

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUserId(user?.sub ?? null);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      <SelectedImagesProvider>
        {userId !== null ? (
          children
        ) : (
          <>
            <Navigation />
            {children}
          </>
        )}
      </SelectedImagesProvider>
    </AuthContext.Provider>
  );
}