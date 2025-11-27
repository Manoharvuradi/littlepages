'use client';

import React, { useState } from 'react';

interface AddressStepProps {
  onNext: () => void;
}

interface FormState {
  country: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
}

interface Errors {
  [key: string]: string;
}

export default function AddressStep({ onNext }: AddressStepProps) {
  const inputBaseClasses =
    'w-full mt-1 border rounded-lg px-4 py-3 text-sm';

  const [form, setForm] = useState<FormState>({
    country: 'United States',
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
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
    setIsSubmitting(true);
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Address</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Country */}
        <div>
          <label className="text-sm font-medium text-gray-700">Country</label>
          <input
            name="country"
            value={form.country}
            readOnly
            className={`${inputBaseClasses} bg-gray-100 text-gray-600 border border-gray-300`}
            aria-invalid={false}
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mt-6">Your Name</h3>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className={`${inputBaseClasses} ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={errors.firstName ? true : false}
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
              placeholder="Enter last name"
              className={`${inputBaseClasses} ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={errors.lastName ? true : false}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mt-6">Address Details</h3>

        {/* Address */}
        <div>
          <label className="text-sm font-medium text-gray-700">Street Address</label>
          <input
            name="streetAddress"
            value={form.streetAddress}
            onChange={handleChange}
            placeholder="1234 Main St"
            className={`${inputBaseClasses} ${
              errors.streetAddress ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.streetAddress ? true : false}
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
            placeholder="Apt, Suite, etc."
            className={`${inputBaseClasses} border-gray-300`}
            aria-invalid={false}
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
              placeholder="City"
              className={`${inputBaseClasses} ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={errors.city ? true : false}
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
              className={`${inputBaseClasses} bg-white ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={errors.state ? true : false}
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
              placeholder="ZIP Code"
              className={`${inputBaseClasses} ${
                errors.zip ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={errors.zip ? true : false}
            />
            {errors.zip && (
              <p className="text-xs text-red-500 mt-1">{errors.zip}</p>
            )}
          </div>
        </div>

        {/* Default Checkbox */}
        <div className="flex items-center mt-4">
          <input type="checkbox" className="mr-2" />
          <label className="text-sm text-gray-600">Set as default</label>
        </div>

        {/* Submit */}
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