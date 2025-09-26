"use client";

import { sign } from "crypto";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "../../server/user";

const navItems = [
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
    const router = useRouter();
  async function handleLogout() {
    const res = await signOut();
    if (res.ok) {
      router.push("/");
    }
  }

    return (
      <div className="flex pt-18">
        <aside className="w-64 h-screen border-r bg-white flex flex-col">
          <div className="flex-1">
            <nav className="flex flex-col space-y-1 p-2">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={
                      "flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100" +
                      (active ? " bg-blue-50 text-blue-600 font-medium" : "")
                    }
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="p-2">
            <button className="w-full px-4 py-2 text-left rounded-md hover:bg-gray-100 text-gray-700"
              onClick={handleLogout}
            >
              ↩️ Sign Out
            </button>
          </div>
        </aside>
        <main className="flex-1">
          <Component {...props} />
        </main>
      </div>
    );
  };
}