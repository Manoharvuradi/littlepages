'use client';

import React, { useState } from 'react';
import PayButton from './paybutton';

interface ShippingPageProps {
  onNext: () => void;
  flowData?: any;
  setFlowData?: (data: any) => void;
  onBack: () => void;
}

export default function PaymentPage({ onNext, onBack, flowData, setFlowData }: ShippingPageProps) {

  console.log("PaymentPage flowData:", flowData);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto w-full">
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
          <div className="border border-gray-200 rounded-md p-4 mb-6">
            <p className="font-semibold text-gray-900">{flowData?.address?.name}</p>
            <p className="text-gray-700 text-sm">{flowData?.address?.street}</p>
            <p className="text-gray-700 text-sm">{flowData?.address?.city}</p>
            <p className="text-gray-700 text-sm">{flowData?.address?.state}</p>
            <p className="text-gray-700 text-sm">{flowData?.address?.zip}</p>
            <button className="text-blue-600 text-sm mt-2 font-medium hover:underline">Edit</button>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-3">Shipping Method</h2>
          <div className="bg-[#F5F9FA] border border-indigo-100 text-black p-4 rounded-md mb-5">
            <p className="font-semibold"> 
              <img src="/svg/exclamation.svg" alt="Info" className="inline w-6 h-6 mr-2 mb-1" />
              Book Printing Time
            </p>
            <p className="text-sm text-gray-400">
              Your book will take 3-5 business days to print and dry before it is shipped. Please keep this in mind when choosing a shipping method.
            </p>
          </div>
          <PayButton amount={parseInt("1")} setFlowData={setFlowData} onNext={onNext} />
        </div>
      </div>
    </div>
  );
}