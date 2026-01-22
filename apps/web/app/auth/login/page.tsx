"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../../server/user";
import { images, users } from "@repo/types";

export default function LoginPage() {
  // const [user, setUser] = useState< | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [showSignup, setShowSignup] = useState(false);



  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await loginUser(email, password);
    console.log(error);

    if (error) {
      alert(error.message);
    } else {
      router.push("/photos");
    }
    setLoading(false);
  }

  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden py-8">
  {/* Decorative background elements */}
  <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
  <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
  <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

  {/* Login Card */}
  <div className="relative z-10 w-full max-w-md mx-4 top-7" data-aos="fade-up">
    {/* Gradient glow effect */}
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-20 blur-xl"></div>
    
    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center">
        {/* Icon */}
        <div className="relative mb-3">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50"></div>
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-3 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-1">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center text-sm">
          Sign in to continue your journey
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        {/* Email Input */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-focus-within:opacity-10 blur transition-opacity duration-300"></div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="relative w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            required
          />
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end -mt-1">
          <button
            type="button"
            className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold hover:underline transition-all duration-300"
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden mt-1"
        >
          <span className="relative z-10 text-sm">
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
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

      {/* Sign Up Link */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-gray-600 text-xs">Don't have an account?</span>
        <button
          onClick={() => router.push("/auth/signup")}
          className="group relative font-semibold text-sm px-5 py-1.5 rounded-lg transition-all duration-300"
        >
          <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Create new account
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  </div>
</div>
  );
}