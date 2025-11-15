"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, logout } from "../../server/user";
import React, { useEffect } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import StaticNavbar from "../../common/staticnavbar/staticnavbar";

const navItems = [
  { name: "", href: "", icon: "⏮️" },
  { name: "My Photos", href: "/photos", icon: "📷" },
  { name: "My Books", href: "/books", icon: "📚" },
  { name: "My Orders", href: "/orders", icon: "📦" },
  { name: "Account Details", href: "/account", icon: "👤" },
  { name: "Address", href: "/address", icon: "🏠" },
];

// HOC version
export default function WithSidebar(Component: React.ComponentType) {
  return function SidebarWrapper(props: any) {
    const pathname = usePathname();
    const [sideBar, setSideBar] = React.useState(true);
    const router = useRouter();
      const { setUserId } = useAuth();


      useEffect(() => {
    async function verifyUser() {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/"); // redirect to home if logged out
      }
    }
    verifyUser();
  }, []);
  async function handleLogout() {
// when logout is called:
    const res = await logout();
    if(res){
      setUserId(null);
      router.push("/");
    }
  }

    return (
      <>
      <StaticNavbar />

  {/* Wrapper for sidebar + main */}
  <div className="flex h-screen overflow-hidden pt-14">
    {/* Sidebar */}
    <aside
      className={`fixed top-14 left-0 h-[calc(100%-56px)] border-r border-blue-200 bg-white flex flex-col
        transition-all duration-300 ease-in-out overflow-hidden z-40
        ${sideBar ? "w-64" : "w-16"}`}
    >
      <div className="flex-1 overflow-y-auto">
        <nav className="flex flex-col space-y-1 p-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return item.name !== "" ? (
              <Link
                key={item.name}
                href={item.href}
                className={
                  "flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100" +
                  (active ? " bg-blue-50 text-blue-600 font-medium" : "")
                }
              >
                <span>{item.icon}</span>
                {sideBar && <span>{item.name}</span>}
              </Link>
            ) : (
              <span
                key={item.icon?.toString() ?? "toggle"}
                className={`flex items-center justify-center w-8 h-8 text-gray-700 transform transition-transform duration-300 cursor-pointer ${
                  sideBar ? "rotate-180" : "rotate-0"
                }`}
                onClick={() => setSideBar(!sideBar)}
              >
                <span>{item.icon}</span>
                {/* <Image src={item.icon} alt={item.name} width={24} height={24} /> */}
              </span>
            );
          })}
        </nav>
      </div>

      <div className="p-2">
        <button
          className="w-full px-4 py-2 text-left rounded-md hover:bg-gray-100 text-gray-700"
          onClick={handleLogout}
        >
          ↩️ Sign Out
        </button>
      </div>
    </aside>

    {/* Main content */}
    <main
      className={`flex-1 transition-all duration-300 ease-in-out ml-16 md:ml-64 overflow-auto`}
      style={{ marginLeft: sideBar ? "16rem" : "4rem" }}
    >
      <Component {...props} />
    </main>
  </div>
</>
    );
  };
}