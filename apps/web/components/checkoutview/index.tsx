'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ProgressBar from '../progressbar';
import AddressStep from '../addressstep';
import OrderSuccess from '../ordersuccess';
import { useSelectedImages } from '../../context';
import { useParams, useRouter } from 'next/navigation';
import PaymentPage from '../paymentstep';
import ReviewStep from './reviewstep';
import { getCurrentUser } from '../../server/user';
import { fetchAddresses } from '../../server/address';
import OrderFailure from './orderfailure';

export default function CheckoutPage() {
  // Steps: 0=Qty, 1=Addr, 2=Review, 3=Payment, 4=Success
  const [step, setStep] = useState(0); 
  const [quantity, setQuantity] = useState(1);
  const [flowData, setFlowData] = useState<any>({});
  const pricePerBook = Number(process.env.NEXT_PUBLIC_AMOUNT_PER_BOOK);
  const total = (Number(pricePerBook) * Number(quantity)).toFixed(2);
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { coverPagePicture, ctxBookId, ctxBookTitle } = useSelectedImages();

  useEffect(() => {
    if (coverPagePicture == null || coverPagePicture == undefined) {
      router.push(`/books/${id}/previewbook`);
    }
  }, []);

useEffect(() => {
  const loadAddressData = async () => {
    try {
      const user = await getCurrentUser();
      
      if (user && user.sub) {
        const data = await fetchAddresses(user.sub); 
        
        // Only set state if data exists (is not null/undefined)
        if (data) {
          setFlowData({
            address: data,
            pricePerBook: Number(process.env.NEXT_PUBLIC_AMOUNT_PER_BOOK),
            total: (Number(process.env.NEXT_PUBLIC_AMOUNT_PER_BOOK) * Number(quantity)).toFixed(2),
            quantity: quantity,
            bookId: ctxBookId,
            bookTitle: ctxBookTitle,
            coverPagePicture: coverPagePicture
          });
        }
      }
    } catch (error) {
      console.error("Failed to load user addresses:", error);
    }
  };

  loadAddressData();
}, []);

// Update flowData when quantity changes
useEffect(() => {
  const total = (pricePerBook * quantity).toFixed(2);
  
  setFlowData((prev: any) => ({
    ...prev,
    pricePerBook: pricePerBook,
    total: total,
    quantity: quantity,
  }));
}, [quantity, pricePerBook]);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <nav className="bg-gradient-to-r from-[#102371] to-[#1a2d6b] text-white py-4 px-6 font-semibold text-lg flex items-center justify-between shadow-md">
        <button className="text-sm hover:text-gray-200 transition-colors flex items-center gap-2" onClick={() => router.push(`/books/${id}/previewbook`)}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Review Book
        </button>
        {step > 0 && step < 4 && (
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">Checkout Progress</p>
          </div>
        )}
      </nav>

        <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
          {step === 0 && (
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative w-[320px] h-[220px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-2xl">
                  {coverPagePicture && <Image src={coverPagePicture!} alt="Book Preview" fill className="object-cover" />}
                </div>
              </div>
              <h1 className="text-4xl font-bold text-[#102371] mb-2 mt-6">How Many Copies</h1>
              <p className="text-lg text-gray-600 mb-8">of your book would you like?</p>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 w-full max-w-md border border-indigo-100">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button onClick={decrement} className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg font-bold text-xl hover:bg-gray-50">-</button>
                  <div className="flex flex-col items-center">
                    <span className="px-8 py-3 bg-white border-2 border-indigo-300 rounded-lg font-bold text-3xl text-gray-900">{quantity}</span>
                    <span className="text-gray-600 text-sm mt-2">{quantity === 1 ? 'Copy' : 'Copies'}</span>
                  </div>
                  <button onClick={increment} className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg font-bold text-xl hover:bg-gray-50">+</button>
                </div>
                <div className="flex justify-center gap-2"><span className="font-medium">Price:</span><span className="font-bold text-indigo-600">₹{Number(pricePerBook).toFixed(2)}</span></div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 w-full max-w-md border border-indigo-100 flex justify-between">
                <span className="text-gray-700 font-semibold">Total Amount:</span>
                <span className="text-3xl font-bold text-gray-900">₹{Number(total).toFixed(2)}</span>
              </div>

              <button onClick={nextStep} className="w-full max-w-md px-6 py-4 bg-gradient-to-r from-[#009FFF] to-[#0A65C7] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                Continue to Checkout
              </button>
            </div>
          )}

          {(step === 1 || step === 2 || step === 3) && (
            <div>
              <ProgressBar step={step} />
              {step === 1 && (
                <AddressStep 
                  onNext={nextStep} 
                  flowData={flowData} 
                  setFlowData={setFlowData}
                  address={flowData.address}
                />
              )}

              {step === 2 && (
                <ReviewStep 
                  flowData={flowData} 
                  quantity={quantity} 
                  pricePerBook={pricePerBook} 
                  onNext={nextStep} 
                  onBack={prevStep} 
                />
              )}

              {step === 3 && (
                <PaymentPage 
                  onNext={nextStep} 
                  onBack={prevStep} 
                  flowData={flowData} 
                  setFlowData={setFlowData} 
                />
              )}
            </div>
          )}

          {step === 4 && (
            flowData?.orderNumber != null ? (
              <OrderSuccess 
                flowData={flowData} 
                setFlowData={setFlowData} 
                onBack={prevStep} 
              />
            ) : (
              <OrderFailure 
                errorDetails={"Payment failed or was cancelled."} 
                onRetry={() => setStep(1)} 
                onSupport={() => {}} 
              />
            )
          )}

        </div>
    </div>
  );
}