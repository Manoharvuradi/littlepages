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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-indigo-100 rounded-full p-4 mb-3">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-1">Welcome Back</h1>
          <p className="text-gray-500 text-center text-base">Sign in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md mt-2"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center w-full">
          <span className="text-gray-500 text-sm mb-2">Don't have an account?</span>
          <button
            onClick={() => router.push("/auth/signup")}
            className="text-indigo-600 font-semibold underline text-sm hover:text-indigo-800 transition"
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
}