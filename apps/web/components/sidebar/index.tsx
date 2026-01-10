"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, logout } from "../../server/user";
import React, { useEffect } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import StaticNavbar from "../../common/staticnavbar/staticnavbar";
import styles from "./sidebar.module.scss";

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
      // console.log("Logout clicked");
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
        <StaticNavbar 
          onClickMenu={toggleSidebar}
        />

        { sideBar && (
          <div 
            className={`${styles.overlay} fixed bg-black/50 animate-[fadeIn_0.3s_ease-in-out]`}
          />
        )}

        <div className=" pt-14 flex h-screen overflow-hidden">
          <aside
            className={`${styles.sidebar} ${
              sideBar ? styles.expanded : styles.collapsed
            } pt-2 fixed top-14 left-0 h-[calc(100%-3.5rem)] border-r border-blue-200 bg-white flex flex-col transition-all duration-300 ease-in-out overflow-hidden z-40
            ${
              sideBar ? "w-64" : ""
            }`}
          >
            <div className={`${styles.mobileHeader} hidden items-center justify-between p-4 border-b border-gray-200`}>
              <span className="text-lg font-semibold text-gray-900">Menu</span>
              <button
                className="p-2 rounded-md hover:bg-gray-100"
                // onClick={widthSidebar}
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            { sideBar && <div className="flex-1 overflow-y-auto">
              <nav className="flex flex-col space-y-1 p-2">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return item.name != "Logout"  ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                        active ? "bg-blue-50 text-blue-600 font-medium" : ""
                      }`}
                      onClick={widthSidebar}
                    >
                      <img
                        src={item.icon as string}
                        alt={item.name}
                        width={24}
                        height={24}
                        className="flex-shrink-0"
                      />
                      {(sideBar) && <span className="whitespace-nowrap">{item.name}</span>}
                    </Link>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                        active ? "bg-blue-50 text-blue-600 font-medium" : ""
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
                      {(sideBar) && <span className="whitespace-nowrap">{item.name}</span>}
                    </Link>
                  )
                })}
              </nav>
            </div>}
          </aside>

          {/* Main content */}
          <main
            className={`${styles.mainContent} ${
              sideBar ? styles.withExpandedSidebar : styles.withCollapsedSidebar
            } flex-1 overflow-auto transition-all duration-300 ease-in-out`}
            style={{ marginLeft: sideBar ? "16rem" : "" }}
          >
            <Component {...props} />
          </main>
        </div>
      </>
    );
  };
}