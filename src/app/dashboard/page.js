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
          <div className="w-2/4 sm:w-2/3 md:w-1/3 h-[6px] mt-3 bg-[#63A1F2]"></div>

          <p className="text-base sm:text-lg text-gray-700 mt-4 max-w-xl">
            Discover perfect ingredient combinations for meat, vegetables, spices, and AI-powered recipes.
          </p>
          <div className="mt-6 text-sm font-medium text-gray-600">
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] sm:text-xs">
                  1
                </div>
                <span className="text-black text-xs sm:text-sm">Meat</span>
              </div>
              <div className="h-[2px] w-2 sm:w-4 bg-black" />
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] sm:text-xs">
                  2
                </div>
                <span className="text-black text-xs sm:text-sm">Vegetables</span>
              </div>
              <div className="h-[2px] w-2 sm:w-4 bg-black" />
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] sm:text-xs">
                  3
                </div>
                <span className="text-black text-xs sm:text-sm">Spices + AI</span>
              </div>
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

        {/* SpiceCrafter Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
            SpiceCrafter <br /> Discovery Tool
          </h2>
          <div className="w-2/5 sm:w-1/2 md:w-1/5 h-[6px] mt-3 bg-[#2703A6]" />

          <p className="text-base sm:text-lg text-gray-700 mt-4 max-w-xl">
            Craft your spice blends with precision. Select key ingredients and let our AI enhance your pairing skills with unique suggestions.
          </p>
          <button
            onClick={() => router.push("/spices-crafter")}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-semibold uppercase tracking-wide hover:bg-[#2703A6] hover:text-white transition-all"
          >
            <span>Explore SpiceCrafter</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </section>

        {/* SauceCrafter Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
            SauceCrafter <br /> Creation Studio
          </h2>
          <div className="w-2/5 sm:w-1/2 md:w-1/5 h-[6px] mt-3 bg-[#A63D03]" />

          <p className="text-base sm:text-lg text-gray-700 mt-4 max-w-xl">
            Experiment with delicious homemade sauces. Adjust ingredient ratios, get tips, and create blends that elevate every dish.
          </p>
          <button
            onClick={() => router.push("/sauce-crafter")}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-semibold uppercase tracking-wide hover:bg-[#A63D03] hover:text-white transition-all"
          >
            <span>Explore SauceCrafter</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </section>

        {/* Marination Master Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
            Marination Master <br /> Flavor Infusion
          </h2>
          <div className="w-2/5 sm:w-1/2 md:w-1/5 h-[6px] mt-3 bg-[#0DA64F]" />

          <p className="text-base sm:text-lg text-gray-700 mt-4 max-w-xl">
            Explore balanced marinades tailored for meats. Adjust ratios, understand timing, and bring bold flavor to every bite.
          </p>
          <button
            onClick={() => router.push("/marination-master")}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-semibold uppercase tracking-wide hover:bg-[#0DA64F] hover:text-white transition-all"
          >
            <span>Explore Marination Master</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
