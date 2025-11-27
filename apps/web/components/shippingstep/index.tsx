'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ShippingPageProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ShippingStep({ onNext, onBack }: ShippingPageProps) {
  const [selectedMethod, setSelectedMethod] = useState('ground');
  const [shippingCost, setShippingCost] = useState(6.99);
  const pricePerBook = 27.5;
  const quantity = 2;
  const subtotal = pricePerBook * quantity;
  const total = (subtotal + shippingCost).toFixed(2);

  const handleSelect = (method: string, cost: number) => {
    setSelectedMethod(method);
    setShippingCost(cost);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto w-full">
        {/* Left Side */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {/* Shipping Address */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
          <div className="border border-gray-200 rounded-md p-4 mb-6">
            <p className="font-semibold text-gray-900">John Doe</p>
            <p className="text-gray-700 text-sm">2-71/4-3</p>
            <p className="text-gray-700 text-sm">Fort Wayne, Indiana 46774</p>
            <p className="text-gray-700 text-sm">United States</p>
            <button className="text-blue-600 text-sm mt-2 font-medium hover:underline">Edit</button>
          </div>

          {/* Shipping Method */}
          <h2 className="text-xl font-bold text-gray-800 mb-3">Shipping Method</h2>
          <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 p-4 rounded-md mb-5">
            <p className="font-semibold">📘 Book Printing Time</p>
            <p className="text-sm">
              Your book will take 3–5 business days to print and dry before it is shipped.
            </p>
          </div>

          {/* Methods */}
          <div className="space-y-3">
            <label
              className={`flex justify-between items-center border rounded-md p-3 cursor-pointer ${
                selectedMethod === 'ground' ? 'border-[#102371] bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => handleSelect('ground', 6.99)}
            >
              <div>
                <p className="font-medium text-gray-800">Ground</p>
                <p className="text-sm text-gray-600">5–7 Business days</p>
              </div>
              <p className="font-semibold text-gray-800">$6.99</p>
            </label>

            <label
              className={`flex justify-between items-center border rounded-md p-3 cursor-pointer ${
                selectedMethod === '3day' ? 'border-[#102371] bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => handleSelect('3day', 22.95)}
            >
              <div>
                <p className="font-medium text-gray-800">3 Day</p>
              </div>
              <p className="font-semibold text-gray-800">$22.95</p>
            </label>

            <label
              className={`flex justify-between items-center border rounded-md p-3 cursor-pointer ${
                selectedMethod === 'nextday' ? 'border-[#102371] bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => handleSelect('nextday', 62.3)}
            >
              <div>
                <p className="font-medium text-gray-800">Next Day</p>
              </div>
              <p className="font-semibold text-gray-800">$62.30</p>
            </label>
          </div>

          {/* Continue Button */}
          <button
            onClick={onNext}
            className="mt-8 w-full px-6 py-3 bg-[#009FFF] text-white font-semibold rounded-lg shadow hover:bg-[#0A65C7] transition"
          >
            Continue to Payment
          </button>
        </div>

        {/* Right Side: Order Summary */}
        {/* <div className="w-full md:w-80 bg-white rounded-lg shadow p-6 self-start">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Order Summary ({quantity} Items)
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-16 h-16">
              <Image src="/book-preview.jpg" alt="Book Thumbnail" fill className="object-cover rounded-md" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Art Book</p>
              <p className="text-sm text-gray-500">{quantity} Items</p>
            </div>
            <p className="font-semibold text-gray-800">${pricePerBook.toFixed(2)}</p>
          </div>

          <hr className="my-3" />

          <div className="flex items-center justify-between text-gray-700 mb-2">
            <p>j</p>
            <button className="text-blue-600 font-medium text-sm">+</button>
          </div>

          <div className="flex items-center justify-between text-gray-700 mb-1">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-between text-gray-700 mb-1">
            <p>Shipping & Handling</p>
            <p>${shippingCost.toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-between text-gray-700 mb-1">
            <p>Estimated Tax</p>
            <p>$0.00</p>
          </div>

          <hr className="my-3" />

          <div className="flex items-center justify-between font-bold text-gray-900 text-lg">
            <p>Total</p>
            <p>${total}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}