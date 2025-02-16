"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cabin } from "next/font/google";
import MeatPairings from "@/components/MeatPairings";
import HeroSection from "@/components/HeroSection";

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include", // ✅ Ensure cookies are sent
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        setUser(data.user);
      } catch (err) {
        console.error(err);
        router.push("/"); // Redirect to login if unauthorized
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className={`min-h-screen bg-white text-black ${cabin.className}`}>
      {/* ✅ Unified Container for Consistent Spacing */}
      <div className="w-full px-2 sm:px-6 md:px-10">
        {/* Top Black Line (Now Inside Container) */}
        <div className="w-full h-[2px] bg-black"></div>

        {/* HEADER SECTION */}
        <header className="py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold uppercase tracking-wide">Flavor Bible</h1>
          {/* Logout Button */}
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
              router.push("/"); // Redirect to login page
            }}
            className="px-4 py-2 bg-black text-white text-sm font-semibold uppercase tracking-wide border border-black hover:bg-white hover:text-black transition-all"
          >
            Logout
          </button>
        </header>

        {/* TITLE SECTION */}
        <section className="my-16 py-6">
          <h2 className="text-4xl sm:text-6xl font-bold">Flavor <br />Combinations Guide</h2>
          <div className="w-1/3 h-3 mt-2 bg-[#63A1F2]"></div>
          <p className="text-base sm:text-lg text-gray-600 mt-2">
            Find the perfect match for your dish
          </p>
        </section>

        {/* ✅ Hero Section (Newly Added) */}
        <HeroSection />

        {/* MEAT PAIRINGS SECTION (Aligned Properly) */}
        <section className="w-full px-0 flex justify-start">
          <MeatPairings />
        </section>
      </div>
    </div>
  );
}
