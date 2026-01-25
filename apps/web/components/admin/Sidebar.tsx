'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Orders', href: '/admin/orders', icon: '📦' },
  { name: 'Customers', href: '/admin/customers', icon: '👥' },
  { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-gray-900 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-4 py-6">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 pb-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-white font-medium">AD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <button className="text-xs text-gray-400 hover:text-gray-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}