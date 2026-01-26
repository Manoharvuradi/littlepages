'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ProgressBar from '../progressbar';
import AddressStep from '../addressstep';
import ShippingStep from '../shippingstep';
import ConfirmationStep from '../conformationstep/page';
import OrderSuccess from '../ordersuccess';
import { useSelectedImages } from '../../context';
import { useParams, useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [step, setStep] = useState(0); // 0 = book quantity, 1..4 = checkout steps
  const [quantity, setQuantity] = useState(1);
  const [flowData, setFlowData] = useState<any>({});
  const pricePerBook = 999.00;
  const total = (pricePerBook * quantity).toFixed(2);
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { coverPagePicture } = useSelectedImages();

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <nav className="bg-gradient-to-r from-[#102371] to-[#1a2d6b] text-white py-4 px-6 font-semibold text-lg flex items-center justify-between shadow-md">
        <button className="text-sm hover:text-gray-200 transition-colors flex items-center gap-2" onClick={()=>router.push(`/books/${id}/previewbook`)}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Review Book
        </button>
        {step > 0 && (
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-sm">Checkout Progress</p>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto w-full">
        {/* Left Side */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
          {/* STEP 0 — Quantity Selector */}
          {step === 0 && (
            <div className="flex flex-col items-center text-center">
              {/* Book Preview */}
              <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative w-[320px] h-[220px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={coverPagePicture!}
                    alt="Book Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 w-full bg-gradient-to-b from-black/20 to-transparent text-white text-sm py-3 font-semibold backdrop-blur-xxs">
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-[#102371] mb-2 mt-6">How Many Copies</h1>
              <p className="text-lg text-gray-600 mb-8">of your book would you like?</p>

              {/* Quantity Selector */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 w-full max-w-md border border-indigo-100">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    onClick={decrement}
                    className="w-12 h-12 bg-white border-2 border-gray-300 text-gray-800 rounded-lg font-bold text-xl hover:bg-gray-50 hover:border-indigo-400 transition-all shadow-sm active:scale-95"
                  >
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <div className="flex flex-col items-center">
                    <span className="px-8 py-3 bg-white border-2 border-indigo-300 rounded-lg font-bold text-3xl text-gray-900 shadow-sm min-w-[100px] text-center">
                      {quantity}
                    </span>
                    <span className="text-gray-600 text-sm mt-2 font-medium">
                      {quantity === 1 ? 'Copy' : 'Copies'}
                    </span>
                  </div>
                  
                  <button
                    onClick={increment}
                    className="w-12 h-12 bg-white border-2 border-gray-300 text-gray-800 rounded-lg font-bold text-xl hover:bg-gray-50 hover:border-indigo-400 transition-all shadow-sm active:scale-95"
                  >
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="text-sm font-medium">Price per book:</span>
                  <span className="text-xl font-bold text-indigo-600">₹{pricePerBook.toFixed(2)}</span>
                </div>
              </div>

              {/* Total Display */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 w-full max-w-md border border-indigo-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-semibold text-lg">Total Amount:</span>
                  <span className="text-3xl font-bold text-gray-900">₹{total}</span>
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={nextStep}
                className="w-full max-w-md px-6 py-4 bg-gradient-to-r from-[#009FFF] to-[#0A65C7] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-lg"
              >
                Continue to Checkout
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <p className="text-sm text-gray-500 mt-4">Free shipping on all orders 🚚</p>
            </div>
          )}

          {/* STEP 1–4 — Checkout Steps */}
          {step > 0 && (
            <div>
              <ProgressBar step={step} />
              {step === 1 && <AddressStep onNext={nextStep} flowData={flowData} setFlowData={setFlowData} />}
              {step === 2 && <ShippingStep onNext={nextStep} onBack={prevStep} flowData={flowData} setFlowData={setFlowData} />}
              {/* {step === 3 && (
                <ConfirmationStep
                  onConfirm={nextStep}
                  onBack={prevStep}
                  totalAmount={parseFloat(total)}
                />
              )} */}
              {step === 4 && <OrderSuccess flowData={flowData} setFlowData={setFlowData} onBack={prevStep} />}
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full md:w-80 bg-white rounded-xl shadow-lg p-6 self-start sticky top-8">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-lg font-bold text-gray-800">
              Order Summary
            </h2>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-200 to-gray-300">
                <Image
                  src={coverPagePicture!}
                  alt="Book Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">Art Book</p>
                <p className="text-sm text-gray-600">
                  Quantity: {quantity} {quantity > 1 ? 'Items' : 'Item'}
                </p>
                <p className="text-sm font-medium text-indigo-600 mt-1">
                  ${pricePerBook.toFixed(2)} each
                </p>
              </div>
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="mb-4">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-colors group">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="font-medium text-green-700 text-sm">Add Promo Code</span>
              </div>
              <svg className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">₹{(pricePerBook * quantity).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <span>Estimated Tax</span>
              <span className="font-semibold">₹0.00</span>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <span>Shipping</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-bold text-gray-900">Total</span>
            <span className="text-3xl font-bold text-gray-900">₹{total}</span>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs text-gray-600 font-medium">Secure</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <span className="text-xs text-gray-600 font-medium">Fast Ship</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="text-xs text-gray-600 font-medium">Quality</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}