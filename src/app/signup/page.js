"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Signup failed!");
      }

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-gray-100 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {success && <p className="text-green-500 text-center mt-2">{success}</p>}

        <form onSubmit={handleSignup} className="mt-6">
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border border-black focus:ring-2 focus:ring-black bg-white text-black"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border border-black focus:ring-2 focus:ring-black bg-white text-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 bg-black text-white font-semibold uppercase tracking-wide border border-black hover:bg-white hover:text-black transition-all"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/" className="text-black font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
