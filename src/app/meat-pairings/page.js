"use client";

import React from "react";
import MultiStepForm from "@/components/MultiStepForm";

export default function MeatPairingsPage() {
  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 lg:px-12 py-12">
      <h2 className="text-3xl sm:text-5xl font-bold uppercase mb-8">
        Build Your Pairing
      </h2>
      <MultiStepForm />
    </div>
  );
}
