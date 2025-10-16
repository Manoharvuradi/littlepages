"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, logout } from "../../server/user";
import React, { useEffect } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import Image from "next/image";
import { useSelectedImages } from "../../context";

const navItems = [
  { name: "", href: "", icon: "/svg/back.svg" },
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

        const { selectedImages } = useSelectedImages();

        console.log("Selected images in sidebar:", selectedImages);


  const selectedCount = selectedImages.length;
  const hasSelection = selectedCount > 0;

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
          <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-3 flex items-center justify-between transition-colors duration-300 ${
        hasSelection
          ? "bg-[rgb(16,35,113)] text-white shadow-lg"
          : "bg-white text-gray-800 shadow-md"
      }`}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center space-x-3">
        {hasSelection ? (
          <>
            <button
              onClick={() => console.log("onClearSelection")}
              className="p-2 rounded-full hover:bg-white/20 transition"
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

            {/* Count + text */}
            <span className="text-lg font-semibold">
              {selectedCount} selected
            </span>
          </>
        ) : (
          <span className="font-bold text-lg">Little Pages</span>
        )}
      </div>

      {/* RIGHT SIDE */}
      {hasSelection ? (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => console.log("onEdit")}
            className="px-3 py-1.5 rounded-md bg-white text-[rgb(16,35,113)] font-semibold hover:bg-gray-100 transition"
          >
            Edit
          </button>
          <button
            onClick={() => console.log("onDownload")}
            className="px-3 py-1.5 rounded-md bg-white text-[rgb(16,35,113)] font-semibold hover:bg-gray-100 transition"
          >
            Download
          </button>
          <button
            onClick={() => console.log("onDelete")}
            className="px-3 py-1.5 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            LP
          </div>
        </div>
      )}
    </nav>

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
                <Image src={item.icon} alt={item.name} width={24} height={24} />
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