"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cabin } from "next/font/google";
import HeroSection from "@/components/HeroSection";

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        setUser(data.user);
      } catch (err) {
        console.error(err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (!isMounted) return null;
  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className={`min-h-screen bg-white text-black ${cabin.className}`}>
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 py-12">
        {/* Intro Section */}
        <section className="mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold leading-tight">
            Meat <br /> Combinations Guide
          </h2>
          <div className="w-1/3 h-[6px] mt-3 bg-[#63A1F2]"></div>

          <p className="text-base sm:text-lg text-gray-700 mt-4 max-w-xl">
            Discover perfect ingredient combinations for meat, vegetables, spices, and AI-powered recipes.
          </p>

          {/* Step Overview (Now responsive) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
                1
              </div>
              <span className="text-black font-medium">Meat</span>
            </div>
            <div className="hidden sm:block h-[2px] w-4 bg-black" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
                2
              </div>
              <span className="text-black font-medium">Vegetables</span>
            </div>
            <div className="hidden sm:block h-[2px] w-4 bg-black" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
                3
              </div>
              <span className="text-black font-medium">Spices + AI Recipe</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => router.push("/meat-pairings")}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-semibold uppercase tracking-wide hover:bg-[#63A1F2] hover:text-white transition-all"
          >
            <span>Start Your Flavor Journey</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </section>

        {/* Hero Section */}
        <HeroSection />
      </div>
    </div>
  );
}
