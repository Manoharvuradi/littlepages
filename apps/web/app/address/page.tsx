"use client";

import React, { useEffect, useState } from "react";
import WithSidebar from "../../components/sidebar";
import { deleteAddress, fetchAddresses, updateAddress } from "../../server/address";
import { getCurrentUser } from "../../server/user";

type Address = {
  id: string;
  name: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
  isDefault: boolean;
};

const Address = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Address | null>(null);
  const [saving, setSaving] = useState(false);

  // 🔹 Fetch addresses
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        
        if (!user?.sub) {
          setAddresses([]);
          return;
        }
        
        const data = await fetchAddresses(user.sub);
        
        // Filter out null values
        const validAddresses = (data || []).filter(Boolean);
        setAddresses(validAddresses);
        
      } catch (e) {
        console.error('Error loading addresses:', e);
        setAddresses([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  console.log('Addresses:', addresses);

  // 🔹 Save edited address
  const handleSave = async () => {
    if (!editing) return;
    try {
      setSaving(true);
      await updateAddress(editing.id, editing);
      setAddresses((prev) =>
        prev.map((a) => (a.id === editing.id ? editing : a))
      );
      setEditing(null);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this address?")) return;
    await deleteAddress(id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading addresses...</p>
        </div>
      </div>
    );
  }

  if (!loading && addresses.length === 0) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-[#F9FAFB] p-4">
        <div className="text-center py-12 rounded-2xl px-8 max-w-md">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="mt-6 text-xl font-bold text-gray-900">No addresses found</h3>
          <p className="mt-2 text-sm text-gray-500">You can add address while ordering book</p>
          {/* <button className="mt-6 h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Address
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-[#F9FAFB] p-4 md:p-12 text-gray-500">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-600">Shipping Addresses</h1>
            <p className="text-slate-500 mt-1">Select or manage where you receive your packages.</p>
          </div>
          {/* <button className="h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-sm shadow-indigo-200 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Address
          </button> */}
        </div>

        {/* Address Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <div
              key={address?.id}
              className={`group relative bg-white border-2 rounded-2xl p-6 transition-all duration-300 ${
                address?.isDefault 
                  ? "border-indigo-600 shadow-md ring-4 ring-indigo-50" 
                  : "border-slate-100 hover:border-slate-200 hover:shadow-lg"
              }`}
            >
              {address?.isDefault && (
                <span className="absolute -top-3 left-6 bg-[#009FFF] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  Default
                </span>
              )}

              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-gray-500">{address?.name}</h3>
                <div className="flex gap-2">
                   <button onClick={() => setEditing(address)} className="p-2 text-slate-400 hover:text-[#009FFF] hover:bg-indigo-50 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                   </button>
                   <button onClick={() => handleDelete(address.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                   </button>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed space-y-1">
                <span className="block font-medium text-slate-800">{address?.street} {address?.apartment && `• ${address?.apartment}`}</span>
                <span className="block">{address?.city}, {address?.state} {address?.zip}</span>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-tighter mt-2">{address?.country}</span>
              </p>

              {address?.phone && (
                <div className="flex items-center gap-2 mt-4 text-sm font-medium text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                   </svg>
                   {address?.phone}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Edit Modal Overlay */}
        {editing && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden ring-1 ring-black/5 animate-in zoom-in-95 duration-200">
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Edit Address</h2>
                <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
                  {[
                    { label: "Full Name", key: "name", span: "col-span-2" },
                    { label: "Street", key: "street", span: "col-span-2" },
                    { label: "City", key: "city", span: "col-span-1" },
                    { label: "State", key: "state", span: "col-span-1" },
                    { label: "Zip Code", key: "zip", span: "col-span-1" },
                    { label: "Country", key: "country", span: "col-span-1" },
                    { label: "Phone Number", key: "phone", span: "col-span-2" },
                  ].map((field) => (
                    <div key={field.key} className={field.span}>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{field.label}</label>
                      <input
                        value={(editing as any)[field.key] || ""}
                        onChange={(e) => setEditing({ ...editing, [field.key]: e.target.value })}
                        className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#009FFF] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 mt-10">
                  <button onClick={() => setEditing(null)} className="h-11 px-6 text-slate-500 font-bold hover:text-slate-700 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={saving} className="h-11 px-8 bg-[#009FFF] hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-100 disabled:opacity-50">
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithSidebar(Address);