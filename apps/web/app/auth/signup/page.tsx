'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { signupUser } from '../../../server/user';

const SignupPage = () => {
    const [signupLoading, setSignupLoading] = useState(false);
    //Signup modal state
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [showSignup, setShowSignup] = useState(false);
      const router = useRouter()

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        setSignupLoading(true);
        const { error } = await signupUser({ name: signupName, email: signupEmail, password: signupPassword });
        if (error) alert(error.message);
        else {
            setShowSignup(false);
            setSignupName("");
            setSignupEmail("");
            setSignupPassword("");
            router.push("/photos");
        }
        setSignupLoading(false);
    }
    return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
  {/* Modal */}
  <div className="relative w-full max-w-md" data-aos="zoom-in">
    {/* Gradient glow effect */}
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-30 blur-xl"></div>
    
    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-110"
        onClick={() => {
          setShowSignup(false);
          router.push("/auth/login");
        }}
        aria-label="Close"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div className="mb-6 flex flex-col items-center">
        {/* Icon */}
        <div className="relative mb-3">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50"></div>
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-3 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-1">
          Create Account
        </h2>
        <p className="text-gray-600 text-center text-sm">
          Join us and start your journey
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
        {/* Name Input */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-focus-within:opacity-10 blur transition-opacity duration-300"></div>
          <input
            type="text"
            placeholder="Full Name"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            className="relative w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            required
          />
        </div>

        {/* Email Input */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-focus-within:opacity-10 blur transition-opacity duration-300"></div>
          <input
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            className="relative w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-focus-within:opacity-10 blur transition-opacity duration-300"></div>
          <input
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            className="relative w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={signupLoading}
          className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden mt-2"
        >
          <span className="relative z-10 text-sm">
            {signupLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </span>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-5">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <span className="text-gray-500 text-xs font-medium">OR</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Login Link */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-gray-600 text-xs">Already have an account?</span>
        <button
          onClick={() => {
            setShowSignup(false);
            router.push("/auth/login");
          }}
          className="group relative font-semibold text-sm px-5 py-1.5 rounded-lg transition-all duration-300"
        >
          <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Sign In
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  </div>
</div>
    )
}

export default SignupPage
