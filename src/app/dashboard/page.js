"use client"; // ✅ Ensure it's a client component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cabin } from "next/font/google";
import MeatPairings from "@/components/MeatPairings";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMeat, setSelectedMeat] = useState(() => "");
  const [selectedVegetables, setSelectedVegetables] = useState(() => []);
  const [selectedSpices, setSelectedSpices] = useState(() => []);
  const [selectedExtras, setSelectedExtras] = useState(() => []);
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

  if (!isMounted) return null; // ✅ Prevents hydration error

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className={`min-h-screen bg-white text-black ${cabin.className}`}>
      <div className="w-full px-2 sm:px-6 md:px-10">
        <NavBar
          selectedMeat={selectedMeat}
          selectedVegetables={selectedVegetables}
          selectedSpices={selectedSpices}
          selectedExtras={selectedExtras}
        />

        <section className="my-16 py-6">
          <h2 className="text-4xl sm:text-6xl font-bold">Flavor <br />Combinations Guide</h2>
          <div className="w-1/3 h-3 mt-2 bg-[#63A1F2]"></div>
          <p className="text-base sm:text-lg text-gray-600 mt-2">
            Find the perfect match for your dish
          </p>
        </section>

        <HeroSection />

        <section className="w-full px-0 flex justify-start">
          <MeatPairings
            setSelectedMeat={setSelectedMeat}
            setSelectedVegetables={setSelectedVegetables}
            setSelectedSpices={setSelectedSpices}
            setSelectedExtras={setSelectedExtras}
          />

        </section>
      </div>
    </div>
  );
}
