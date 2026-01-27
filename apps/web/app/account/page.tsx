'use client'

import React, { useEffect, useState } from 'react'
import WithSidebar from '../../components/sidebar'
import { get } from 'http'
import { getCurrentUser } from '../../server/user'

const Account = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [tempName, setTempName] = useState(name)
  const [tempEmail, setTempEmail] = useState(email)


useEffect(() => {
  const fetchUser = async () => {
    const user = await getCurrentUser();
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  };
  fetchUser();
}, []);

  const handleEdit = () => {
    setTempName(name)
    setTempEmail(email)
    setIsEditing(true)
  }

  const handleSave = () => {
    setName(tempName)
    setEmail(tempEmail)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempName(name)
    setTempEmail(email)
    setIsEditing(false)
  }

  return (
<div className="min-h-[90vh] bg-[#F8FAFC] p-6 md:p-12 text-slate-900">
  <div className="max-w-md mx-auto">
    {/* Page Title */}
    <div className="mb-8">
      <h1 className="text-2xl font-black tracking-tight text-gray-500">Account Details</h1>
      <p className="text-slate-500 text-sm">Manage your public profile and account security.</p>
    </div>

    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
      {/* Decorative Profile Header */}
      <div className="h-24 bg-gradient-to-r from-blue-500 to-[#009FFF] relative">
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-md">
            <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center text-blue-600">
              <span className="text-2xl font-bold uppercase">{name?.charAt(0) || 'U'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pt-16 pb-10">
        {!isEditing ? (
          /* View Mode */
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between group">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.15em] font-bold mb-1">Full Name</p>
                <p className="text-lg font-bold text-slate-800 tracking-tight">{name}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
            </div>

            <div className="flex items-center justify-between group">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.15em] font-bold mb-1">Email Address</p>
                <p className="text-base font-medium text-slate-600">{email}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
            </div>

            <button
              onClick={handleEdit}
              className="w-full bg-[#009FFF] hover:bg-[#007ACC] cursor-pointer text-white font-bold py-4 px-4 rounded-2xl transition-all duration-200 mt-4 shadow-lg shadow-slate-200 active:scale-[0.98]"
            >
              Update
            </button>
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <label htmlFor="name" className="block text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2 ml-1">
                Display Name
              </label>
              <input
                id="name"
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#009FFF] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2 ml-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#009FFF] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium"
                placeholder="email@example.com"
              />
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleSave}
                className="flex-2 grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-blue-100 active:scale-[0.98]"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 px-6 rounded-2xl transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  )
}

export default WithSidebar(Account)