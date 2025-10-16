'use client';

import React, { useState } from 'react';

interface AddressStepProps {
  onNext: () => void;
}

export default function AddressStep({ onNext }: AddressStepProps) {
  const [form, setForm] = useState({
    country: 'United States',
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!form.city.trim()) newErrors.city = 'City/Town is required';
    if (!form.state.trim()) newErrors.state = 'State/Province/Region is required';
    if (!form.zip.trim()) newErrors.zip = 'ZIP/Postal code is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Address</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Country */}
        <div>
          <label className="text-sm font-medium text-gray-700">Country</label>
          <input
            name="country"
            value={form.country}
            readOnly
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
          />
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className={`w-full mt-1 border rounded-lg px-3 py-2 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className={`w-full mt-1 border rounded-lg px-3 py-2 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium text-gray-700">Street Address</label>
          <input
            name="streetAddress"
            value={form.streetAddress}
            onChange={handleChange}
            className={`w-full mt-1 border rounded-lg px-3 py-2 ${
              errors.streetAddress ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.streetAddress && (
            <p className="text-xs text-red-500 mt-1">{errors.streetAddress}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Apartment, Suite, Locality (optional)
          </label>
          <input
            name="apartment"
            value={form.apartment}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">City/Town</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className={`w-full mt-1 border rounded-lg px-3 py-2 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">State/Province/Region</label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className={`w-full mt-1 border rounded-lg px-3 py-2 ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select...</option>
              <option value="CA">California</option>
              <option value="TX">Texas</option>
              <option value="NY">New York</option>
              <option value="FL">Florida</option>
            </select>
            {errors.state && (
              <p className="text-xs text-red-500 mt-1">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">ZIP/Postal Code</label>
            <input
              name="zip"
              value={form.zip}
              onChange={handleChange}
              className={`w-full mt-1 border rounded-lg px-3 py-2 ${
                errors.zip ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.zip && (
              <p className="text-xs text-red-500 mt-1">{errors.zip}</p>
            )}
          </div>
        </div>

        {/* Default Checkbox */}
        <div className="flex items-center mt-2">
          <input type="checkbox" className="mr-2" />
          <label className="text-sm text-gray-600">Set as default</label>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="bg-[#009FFF] text-white px-6 py-2 rounded-lg hover:bg-[#0A65C7] transition"
          >
            Continue to Shipping
          </button>
        </div>
      </form>
    </div>
  );
}