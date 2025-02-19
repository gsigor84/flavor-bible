"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NavBar({ selectedMeat, selectedVegetables, selectedSpices, selectedExtras }) {
  const router = useRouter();
  const [preferredPairings, setPreferredPairings] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchPreferredPairings();
  }, []);

  const fetchPreferredPairings = async () => {
    try {
      const res = await fetch("/api/user-preferred-pairings", { credentials: "include" });
      if (res.status === 405) {
        console.error("❌ GET method not allowed. Make sure API supports GET.");
        return;
      }
      const data = await res.json();
      if (data.preferredPairings) setPreferredPairings(data.preferredPairings);
    } catch (error) {
      console.error("❌ Error fetching preferred pairings:", error);
    }
  };

  const savePreferredPairings = async () => {
    if (!selectedMeat || selectedVegetables.length === 0 || selectedSpices.length === 0) {
      return;
    }

    const newPairing = {
      meat: selectedMeat,
      vegetables: selectedVegetables,
      spices: selectedSpices,
      extra_pairings: selectedExtras,
    };

    try {
      const response = await fetch("/api/user-preferred-pairings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ preferredPairings: newPairing }),
      });

      if (!response.ok) {
        console.error("❌ Failed to save pairings.");
      }
    } catch (error) {
      console.error("Error saving preferred pairings:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/");
  };

  return (
    <header className="flex justify-between items-center py-4 bg-white border-t-2 border-black px-6 relative">
      {/* Logo */}
      <h1 className="text-2xl font-bold uppercase tracking-wide">Flavor Bible</h1>

      {/* Burger Menu Button (Mobile) */}
      <button
        className="md:hidden text-xl focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* Navigation Links */}
      <nav
        className={`absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent md:flex md:items-center md:space-x-4 p-4 md:p-0 border md:border-0 shadow-md md:shadow-none transition-all duration-200 ease-in-out ${isMenuOpen ? "block" : "hidden"
          }`}
      >
        <button
          onClick={savePreferredPairings}
          className="block md:inline px-4 py-2 text-black text-sm font-semibold uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all w-full md:w-auto text-left md:text-center"
        >
          Save Pairings
        </button>

        <button
          onClick={handleLogout}
          className="block md:inline px-4 py-2 bg-black text-white text-sm font-semibold uppercase tracking-wide border border-black hover:bg-white hover:text-black transition-all w-full md:w-auto text-left md:text-center"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
