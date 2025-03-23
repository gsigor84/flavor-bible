"use client";

import React, { useState } from "react";

export default function VegetableStep({ pairings = [], selectedVegetables, setSelectedVegetables, fetchSpicesAndHerbs }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleSelection = (veg) => {
    setSelectedVegetables((prev) =>
      prev.includes(veg) ? prev.filter((v) => v !== veg) : [...prev, veg]
    );
  };

  const handleFetch = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      await fetchSpicesAndHerbs();
    } catch (error) {
      console.error("Failed to fetch spices & herbs:", error);
      setErrorMessage("Failed to fetch spices & herbs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-3xl font-bold uppercase mb-4">Select Vegetables</h2>
      <div className="w-1/3 h-1 bg-[#63A1F2] mb-6" />

      <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
        {pairings.map((veg, index) => (
          <li key={index}>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedVegetables.includes(veg.name)}
                onChange={() => toggleSelection(veg.name)}
                className="w-5 h-5 border-black checked:bg-black"
              />
              <span>{veg.name}</span>
            </label>
          </li>
        ))}
      </ul>

      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}


    </div>
  );
}
