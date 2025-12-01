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
      className={`fixed w-full z-50 text-black nav-transition bg-white shadow-md`}
    >
      <div className="container mx-auto px-6 py-1 flex justify-between items-center">
        <div className="flex items-center">
          <div className="">
            <Image
              src="/images/logo.png"
              alt="Little Pages Logo"
              width={100}
              height={50}
              className="cursor-pointer object-center"
              onClick={() => router.push("/")}
            />
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/howitworks"
            className="text-black hover:text-primary-600 transition-colors font-medium"
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="text-black hover:text-primary-600 transition-colors font-medium"
          >
            Pricing
          </Link>
          <Link
            href="/products"
            className="text-black hover:text-primary-600 transition-colors font-medium"
          >
            Products
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-primary-600 cursor-pointer hover:bg-primary-50 transition-colors"
              onClick={() => router.push("/auth/login")}
            >
              <i data-feather="user" className="text-primary-600"></i>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black focus:outline-none"
            >
              <i data-feather="menu"></i>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 pt-2 pb-4 shadow-md">
          <Link
            href="#how-it-works"
            className="block py-3 text-black hover:text-primary-600 border-b border-gray-100"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="block py-3 text-black hover:text-primary-600 border-b border-gray-100"
          >
            Pricing
          </Link>
          <Link
            href="/products"
            className="block py-3 text-black hover:text-primary-600 border-b border-gray-100"
          >
            Product
          </Link>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-primary-600 mt-4 mx-auto">
            <i data-feather="user" className="text-primary-600"></i>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;