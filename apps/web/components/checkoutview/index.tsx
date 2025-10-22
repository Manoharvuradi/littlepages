'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ProgressBar from '../progressbar';
import AddressStep from '../addressstep';
import ShippingStep from '../shippingstep';
import ConfirmationStep from '../conformationstep/page';

export default function CheckoutPage() {
  const [step, setStep] = useState(0); // 0 = book quantity, 1..4 = checkout steps
  const [quantity, setQuantity] = useState(1);
  const pricePerBook = 27.5;
  const total = (pricePerBook * quantity).toFixed(2);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <nav className="bg-[#102371] text-white py-4 px-6 font-semibold text-lg flex items-center justify-between">
        <button className="text-sm hover:underline">&lt; Review Book</button>
        {step > 0 && <p className="text-sm">Checkout Progress</p>}
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto w-full">
        {/* Left Side */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {/* STEP 0 — Quantity Selector */}
          {step === 0 && (
            <div className="flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Thanks for reviewing your book!</h2>
              <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 p-4 rounded-md mb-6">
                <p className="font-semibold">Last Chance to Buy Discounted Copies of Your Book!</p>
                <p className="text-sm">They make great gifts 🎁</p>
              </div>

              <div className="relative w-[300px] h-[200px] mb-4">
                <Image
                  src="/finalDesign.png"
                  alt="Book Preview"
                  fill
                  className="object-cover rounded-md"
                />
                <div className="absolute bottom-0 w-full bg-white text-gray-800 text-sm py-1 font-medium">
                  IMAGE
                </div>
              </div>

              <h1 className="text-3xl font-bold text-[#102371] mb-2">How Many Copies</h1>
              <p className="text-lg font-medium text-gray-700 mb-6">of your book would you like?</p>

              <div className="flex items-center justify-center gap-3 mb-6">
                <button
                  onClick={decrement}
                  className="w-8 h-8 bg-gray-200 text-gray-800 rounded-md font-bold text-lg hover:bg-gray-300"
                >
                  –
                </button>
                <span className="px-4 py-2 bg-gray-100 border rounded-md font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={increment}
                  className="w-8 h-8 bg-gray-200 text-gray-800 rounded-md font-bold text-lg hover:bg-gray-300"
                >
                  +
                </button>
                <span className="text-gray-700 font-medium">${pricePerBook.toFixed(2)}/ea</span>
              </div>

              <button
                onClick={nextStep}
                className="px-6 py-3 bg-[#009FFF] text-white font-semibold rounded-lg shadow hover:bg-[#0A65C7] transition"
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 1–4 — Checkout Steps */}
          {step > 0 && (
            <div>
              <ProgressBar step={step} />
              {step === 1 && <AddressStep onNext={nextStep} />}
              {step === 2 && <ShippingStep onNext={nextStep} onBack={prevStep} />}
{step === 3 && (
  <ConfirmationStep
    onConfirm={nextStep}
    onBack={prevStep}
    totalAmount={parseFloat(total)}
  />
)}
              {/* {step === 4 && <ReviewStep onBack={prevStep} />} */}
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full md:w-80 bg-white rounded-lg shadow p-6 self-start">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Order Summary ({quantity} {quantity > 1 ? 'Items' : 'Item'})
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-16 h-16">
              <Image
                src="/book-preview.jpg"
                alt="Book Thumbnail"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Art Book</p>
              <p className="text-sm text-gray-500">{quantity} Item{quantity > 1 && 's'}</p>
            </div>
            <p className="font-semibold text-gray-800">${pricePerBook.toFixed(2)}</p>
          </div>

          <hr className="my-3" />

          <div className="flex items-center justify-between text-gray-700 mb-2">
            <p>Promo Code</p>
            <button className="text-blue-600 font-medium text-sm">+</button>
          </div>

          <div className="flex items-center justify-between text-gray-700 mb-1">
            <p>Subtotal</p>
            <p>${(pricePerBook * quantity).toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-between text-gray-700 mb-2">
            <p>Estimated Tax</p>
            <p>$0.00</p>
          </div>

          <hr className="my-3" />

          <div className="flex items-center justify-between font-bold text-gray-900 text-lg">
            <p>Total</p>
            <p>${total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}