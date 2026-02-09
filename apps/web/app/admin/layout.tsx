'use client'

import { useEffect, useState } from "react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";
import { getCurrentUser } from "../../server/user";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const fetchUser = async () => {
      const res = await getCurrentUser();
      setUser(res);
    }

    fetchUser();
  },[]);

  return (
    <div className="min-h-screen bg-gray-50">
      { user && <Sidebar />}
      <div className={`${user && 'lg:ml-64'}`}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}