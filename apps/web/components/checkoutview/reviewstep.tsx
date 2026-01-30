import React from 'react';

interface ReviewStepProps {
  flowData: any;
  quantity: number;
  pricePerBook: number;
  onNext: () => void;
  onBack: () => void;
}

export default function ReviewStep({ flowData, quantity, pricePerBook, onNext, onBack }: ReviewStepProps) {
  const subtotal = pricePerBook * quantity;
  const shipping = 0; // Free shipping as per your UI
  const total = subtotal + shipping;


  // Destructure address fields (adjust these keys based on what your AddressStep actually saves)
  const { name, addressLine1, city, state, zipCode, phone, country } = flowData;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#102371]">Review Your Order</h2>
        <p className="text-gray-500">Please verify your details before proceeding to payment.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipping Details Card */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm relative group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Shipping Address
            </h3>
            <button onClick={onBack} className="text-sm text-indigo-600 font-medium hover:underline flex items-center">
              Edit
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
          </div>
          
          <div className="text-gray-700 space-y-1 text-sm">
            <p className="font-semibold text-lg text-gray-900">{name || 'N/A'}</p>
            <p>{addressLine1 || 'Street Address'}</p>
            <p>{city || 'City'}, {state || 'State'} {zipCode || '000000'}</p>
            <p>{country || 'Country'}</p>
            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span>{phone || 'No phone provided'}</span>
            </div>
          </div>
        </div>

        {/* Order Summary & Payment Amount */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Payment Details
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Price per book</span>
              <span>₹{pricePerBook.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Quantity</span>
              <span>x {quantity}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t border-gray-300 my-2 pt-2 flex justify-between items-center">
              <span className="font-bold text-gray-800 text-base">Total Payable</span>
              <span className="font-bold text-indigo-700 text-xl">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
        <button
          onClick={onBack}
          className="text-sm md:text-lg  flex-1 md:px-4 md:py-2 lg:px-6 lg:py-3  py-1 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 text-sm md:text-lg  flex-1 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-[#009FFF] to-[#0A65C7] text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-all flex justify-center items-center gap-2"
        >
          Proceed to Payment
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}