"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong!");
      }

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard"; // Redirect to dashboard
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SECTION - Branding with Background Video */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:flex w-1/2 relative text-white justify-center items-center"
      >
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        <div className="relative text-center">
          <h1 className="text-[5vw] font-bold uppercase tracking-tight leading-none">
            Discover <br /> Perfect Pairings
          </h1>
          <p className="text-lg mt-4 max-w-xs mx-auto">
            Unlock the best ingredient combinations for every dish.
          </p>
        </div>
      </motion.div>

      {/* RIGHT SECTION - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-16 bg-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Title */}
          <h2 className="text-3xl font-bold text-black text-center">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Sign in to your account
          </p>

          {/* FORM */}
          <motion.form onSubmit={handleLogin} className="mt-8 space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-black">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-black">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
              />
            </motion.div>

            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 bg-black text-white font-semibold uppercase tracking-wide border border-black hover:bg-white hover:text-black transition-all"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Sign-up Link */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-center text-gray-600 mt-4"
          >
            Don't have an account?{" "}
            <a href="/signup" className="text-black font-semibold hover:underline">
              Sign up
            </a>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
