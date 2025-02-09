"use client";

import React from "react";

export default function VegetablePairings({
  pairings,
  selectedVegetables,
  setSelectedVegetables,
  fetchSpicesAndHerbs,
}) {
  // Function to toggle selection
  const toggleSelection = (item) => {
    setSelectedVegetables((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4">
      {/* Divider for Section Separation */}
      <div className="w-full h-[2px] bg-black"></div>

      {/* Section Title */}
      <h4 className="text-2xl font-bold uppercase tracking-wide text-black text-left mb-6">
        Vegetable Pairings
      </h4>

      {/* Vegetable List - Consistent Spacing */}
      <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
        {pairings.map((veg, index) => (
          <li key={index} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedVegetables.includes(veg.name)}
              onChange={() => toggleSelection(veg.name)}
              className="h-5 w-5 border-2 border-black focus:ring-2 focus:ring-black appearance-none checked:bg-black checked:border-black shrink-0"
            />
            <span className="text-lg text-black leading-tight whitespace-nowrap">
              {veg.name}
            </span>
          </li>
        ))}
      </ul>

      {/* Button - Extra Spacing Below List */}
      <div className="mt-14 flex"> {/* Increased spacing here */}
        <button
          onClick={fetchSpicesAndHerbs}
          className="px-6 py-3 bg-black text-white font-semibold uppercase tracking-wide border border-black hover:bg-white hover:text-black transition-all"
        >
          Find Spices & Herbs
        </button>
      </div>
    </div>
  );
}
