'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import feather from "feather-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    feather.replace(); // refresh feather icons
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
  <nav
    className={`fixed w-full z-50 text-black ${isMenuOpen ? 'bg-white' : 'bg-white/75 backdrop-blur-md' }  shadow-md top-0`}
  >
    <div className="mx-auto px-3 py-1 flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src="/images/Image-Photoroom.png"
          alt="Little Pages Logo"
          width={100}
          height={100}
          className="cursor-pointer object-center hover:opacity-80 transition-opacity duration-200"
          onClick={() => router.push("/")}
          priority
        />
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <Link
          href="/howitworks"
          className="text-black hover:scale-110 transition-all duration-200 ease-in-out active:scale-95 font-medium"
        >
          How It Works
        </Link>
        <Link
          href="/pricing"
          className="text-black hover:scale-110 transition-all duration-200 ease-in-out active:scale-95 font-medium"
        >
          Pricing
        </Link>
        <Link
          href="/products"
          className="text-black hover:scale-110 transition-all duration-200 ease-in-out active:scale-95 font-medium"
        >
          Products
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Desktop Profile Icon */}
        <button
          className="hidden md:flex w-10 h-10 rounded-full items-center justify-center cursor-pointer border-gray-300 hover:bg-gray-200 hover:border-gray-400 hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out active:scale-95"
          onClick={() => router.push("/auth/login")}
          aria-label="Login"
        >
          <i data-feather="user" className="text-primary-600"></i>
        </button>
        
        {/* Mobile: Menu/Cancel Toggle */}
        <div className="block md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black focus:outline-none p-1"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <img src="/svg/cancel.svg" alt="Close Menu" className="w-6 h-6 text-black hover:text-gray-600 focus:outline-none transition-colors" />
            ) : (
              <img src="/svg/menu.svg" alt="Open Menu" className="w-6 h-6 text-black hover:text-gray-600 focus:outline-none transition-colors" />
            )}
          </button>
        </div>
      </div>
    </div>
    
    {/* Mobile Menu Overlay */}
    {isMenuOpen && (
      <div 
        className="fixed top-[60px] inset-x-0 bottom-0  md:hidden z-40"
        onClick={() => setIsMenuOpen(false)}
      />
    )}
    
    {/* Mobile Menu Sidebar - slides from right */}
  <div 
      className={`fixed top-[64.5px] right-0 bottom-0 w-full min-h-screen bg-white/75 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden z-50 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full bg-white/75 backdrop-blur-md">   
        {/* Menu Links */}
        <div className="flex flex-col px-6 py-4 flex-1 bg-white/75 backdrop-blur-md space-y-2">
          <Link
            href="/howitworks"
            className="block py-4 px-3 text-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 ease-in-out font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="block py-4 px-3 text-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 ease-in-out font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/products"
            className="block py-4 px-3 text-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 ease-in-out font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Product
          </Link>
          <Link
            href="/auth/login"
            className="block py-4 px-3 text-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 ease-in-out font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default Navigation;