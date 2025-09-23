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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={()=>{
                setShowSignup(false);
                router.push("/auth/login");
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Create Account</h2>
            <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                required
              />
              <button
                type="submit"
                disabled={signupLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md mt-2"
              >
                {signupLoading ? "Creating..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
    )
}

export default SignupPage
