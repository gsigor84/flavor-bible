"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();

  return (
    <header className="px-4 sm:px-6 lg:px-12 py-4 bg-white border-t-2 border-black flex justify-between items-center 
    lg:mt-4 lg:mb-4 lg:ml-20 lg:mr-20">

      {/* ✅ Clickable "Flavor Bible" - Navigates to Dashboard */}
      <h1
        className="text-2xl font-bold uppercase tracking-wide cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        Flavor Bible
      </h1>

      <div className="flex space-x-2 sm:space-x-4">
        {/* ✅ Preferred Pairings Button */}
        <button
          onClick={() => router.push("/preferred-pairings")}
          className="px-4 py-2 text-black text-sm font-semibold uppercase tracking-wide border border-black hover:bg-black hover:text-white transition-all"
        >
          Preferred Pairings
        </button>

        {/* ✅ Logout Button */}
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-black text-white text-sm font-semibold uppercase tracking-wide border border-black hover:bg-white hover:text-black transition-all"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
