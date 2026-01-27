"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, logout } from "../../server/user";
import React, { useEffect } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import StaticNavbar from "../../common/staticnavbar/staticnavbar";
// import styles from "./sidebar.module.scss";

const navItems = [
  { name: "My Photos", href: "/photos", icon: "/svg/photos.svg" },
  { name: "My Books", href: "/books", icon: "/svg/book.svg" },
  { name: "My Orders", href: "/orders", icon: "/svg/orders.svg" },
  { name: "Account Details", href: "/account", icon: "/svg/accountDetails.svg" },
  { name: "Address", href: "/address", icon: "/svg/address.svg" },
  { name: "Logout", href: "/", icon: "/svg/signout.svg" },
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
    }, [router]);

    useEffect(() => {
      // Check if mobile on mount and on resize
      const checkMobile = () => {
        // setIsMobile(window.innerWidth <= 768);
        // On mobile, start with sidebar closed
        if (window.innerWidth <= 1024) {
          setSideBar(false);
        }else{
          setSideBar(true);
        }
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => window.removeEventListener("resize", checkMobile);
    }, []);
    

    const handleLogout = async () => {
      const res = await logout();
      if (res) {
        setUserId(null);
        router.push("/");
      }
    }

    const toggleSidebar = () => {
      setSideBar(!sideBar);
    };

    const widthSidebar = () => {
        setSideBar(true);
    };


    return (
<>
  <StaticNavbar onClickMenu={toggleSidebar} sidebar={sideBar} />

  <div className="pt-14 flex h-screen overflow-hidden">
    {/* Overlay */}
    {sideBar && (
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
        onClick={widthSidebar}
      />
    )}

    {/* Sidebar */}
    <div 
      className={`fixed top-18 left-0 bottom-0 w-64 bg-white/75 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
        sideBar ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="flex flex-col h-full bg-white/75 backdrop-blur-md">   
        {/* Menu Links */}
        <div className="flex flex-col py-4 flex-1 bg-white/75 backdrop-blur-md space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return item.name !== "Logout" ? (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 py-2 px-3 text-lg rounded-md transition-all duration-300 ease-in-out font-medium ${
                  active 
                    ? "text-[#009FFF] bg-blue-50 border-r-4 border-[#009FFF]" 
                    : "text-gray-500 hover:text-[#009FFF] hover:bg-blue-50"
                }`}
                onClick={widthSidebar}
              >
                <img
                  src={item.icon as string}
                  alt={item.name}
                  width={24}
                  height={24}
                  className="flex-shrink-0 grayscale opacity-70"
                />
                <span className="whitespace-nowrap text-sm">{item.name}</span>
              </Link>
            ) : (
              <button
                key={item.name}
                className={`flex items-center space-x-3 py-1 px-3 text-lg rounded-md transition-all duration-300 ease-in-out font-medium w-full text-left ${
                  active 
                    ? "text-[#009FFF] bg-blue-50" 
                    : "text-gray-500 hover:text-[#009FFF] hover:bg-blue-50"
                }`}
                onClick={handleLogout}
              >
                <img
                  src={item.icon as string}
                  alt={item.name}
                  width={24}
                  height={24}
                  className="flex-shrink-0"
                />
                <span className="whitespace-nowrap text-sm">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>

    {/* Main Content */}
    <main
      className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
        sideBar ? "lg:ml-64" : "lg:ml-0"
      }`}
    >
      <Component {...props} />
    </main>
  </div>
</>
    );
  };
}