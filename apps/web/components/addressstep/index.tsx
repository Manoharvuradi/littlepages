'use client';

import React, { useEffect, useState } from 'react';
import { createAddress } from '../../server/address';
import { getCurrentUser } from '../../server/user';

interface AddressStepProps {
  onNext: () => void;
  flowData?: any;
  setFlowData?: any;
}

export interface IFormAddress {
  country: string;
  name: string;
  phone: string;
  street: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  user: {
    sub: number;
  };
}

interface Errors {
  [key: string]: string;
}

export default function AddressStep({ onNext, flowData, setFlowData }: AddressStepProps) {
  const inputBaseClasses =
    'w-full mt-1 border rounded-lg px-4 py-3 text-sm';

  const [form, setForm] = useState<IFormAddress>({
    country: 'India',
    name: '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    user: { sub: null as unknown as number },
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (flowData) {
      setForm(prev => ({ ...prev, 
        name: flowData.name || '',
        phone: flowData.phone || '',
        street: flowData.street || '',
        apartment: flowData.apartment || '',
        city: flowData.city || '',
        state: flowData.state || '',
        zip: flowData.zip || '',
       }));
    }
  }, [flowData]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.street.trim()) newErrors.streetAddress = 'Street address is required';
    if (!form.city.trim()) newErrors.city = 'City/Town is required';
    if (!form.state.trim()) newErrors.state = 'State/Province/Region is required';
    if (!form.zip.trim()) newErrors.zip = 'ZIP/Postal code is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = validate();
    setErrors(newErrors);
    if(flowData != null && flowData != undefined){
      setFlowData((prev: any) => ({ ...prev, address: form }));
      onNext();
    }
    else if (Object.keys(newErrors).length === 0) {
      const user = await getCurrentUser();
      const response = await createAddress({ ...form, user });
      if(response && response.id){
        setFlowData((prev: any) => ({ ...prev, address: response }));
        onNext();
      }else{
        alert('Failed to create address. Please try again.');
        setIsSubmitting(false);
        return;
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Address</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Country</label>
          <input
            name="country"
            value={form.country}
            readOnly
            className={`${inputBaseClasses} w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#009FFF] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium`}
            aria-invalid={false}
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mt-6">Your Name</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={`${inputBaseClasses} ${
                errors.name ? 'border-red-500' : 'w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#009FFF] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium'
              }`}
              aria-invalid={errors.name ? true : false}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={`${inputBaseClasses} ${
                errors.phone ? 'border-red-500' : 'w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#009FFF] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium'
              }`}
              aria-invalid={errors.phone ? true : false}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mt-6">Address Details</h3>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Street Address</label>
          <input
            name="street"
            value={form.street}
            onChange={handleChange}
            placeholder="1234 Main St"
            className={`${inputBaseClasses} ${
              errors.street ? 'border-red-500' : 'w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#009FFF] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium'
            }`}
            aria-invalid={errors.street ? true : false}
          />
          {errors.street && (
            <p className="text-xs text-red-500 mt-1">{errors.street}</p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
            Apartment, Suite, Locality (optional)
          </label>
          <input
            name="apartment"
            value={form.apartment}
            onChange={handleChange}
            placeholder="Apt, Suite, etc."
            className={`${inputBaseClasses} w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#009FFF] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium`}
            aria-invalid={false}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">City/Town</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className={`${inputBaseClasses} ${
                errors.city ? 'border-red-500' : 'w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#009FFF] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium'
              }`}
              aria-invalid={errors.city ? true : false}
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">State/Province/Region</label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className={`${inputBaseClasses} bg-white ${
                errors.state ? 'border-red-500' : 'w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#009FFF] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium'
              }`}
              aria-invalid={errors.state ? true : false}
            >
              <option value="">Select...</option>

              <option value="AP">Andhra Pradesh</option>
              <option value="AR">Arunachal Pradesh</option>
              <option value="AS">Assam</option>
              <option value="BR">Bihar</option>
              <option value="CT">Chhattisgarh</option>
              <option value="GA">Goa</option>
              <option value="GJ">Gujarat</option>
              <option value="HR">Haryana</option>
              <option value="HP">Himachal Pradesh</option>
              <option value="JH">Jharkhand</option>
              <option value="KA">Karnataka</option>
              <option value="KL">Kerala</option>
              <option value="MP">Madhya Pradesh</option>
              <option value="MH">Maharashtra</option>
              <option value="MN">Manipur</option>
              <option value="ML">Meghalaya</option>
              <option value="MZ">Mizoram</option>
              <option value="NL">Nagaland</option>
              <option value="OR">Odisha</option>
              <option value="PB">Punjab</option>
              <option value="RJ">Rajasthan</option>
              <option value="SK">Sikkim</option>
              <option value="TN">Tamil Nadu</option>
              <option value="TS">Telangana</option>
              <option value="TR">Tripura</option>
              <option value="UP">Uttar Pradesh</option>
              <option value="UK">Uttarakhand</option>
              <option value="WB">West Bengal</option>
            </select>
            {errors.state && (
              <p className="text-xs text-red-500 mt-1">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">ZIP/Postal Code</label>
            <input
              name="zip"
              value={form.zip}
              onChange={handleChange}
              placeholder="ZIP Code"
              className={`${inputBaseClasses} ${
                errors.zip ? 'border-red-500' : 'w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#009FFF] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium'
              }`}
              aria-invalid={errors.zip ? true : false}
            />
            {errors.zip && (
              <p className="text-xs text-red-500 mt-1">{errors.zip}</p>
            )}
          </div>
        </div>

        <div className="flex items-center mt-4">
          <input type="checkbox" className="mr-2" />
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Set as default</label>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="bg-[#009FFF] text-white px-6 py-2 rounded-lg hover:bg-[#0A65C7] transition disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
            disabled={isSubmitting}
          >
            Continue to Shipping
          </button>
        </div>
      </form>
    </div>
  );
}