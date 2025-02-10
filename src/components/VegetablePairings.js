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
    <div className="w-full max-w-md mx-auto mt-8 px-4">
      {/* Divider for Section Separation */}
      <div className="w-full h-[2px] bg-black mb-4"></div>

      {/* Section Title */}
      <h4 className="text-2xl font-bold uppercase tracking-wide text-black text-left mb-6">
        Vegetable Pairings
      </h4>

      {/* Vegetable List - Improved Spacing & Touch Accessibility */}
      <ul className="grid grid-cols-2 gap-x-6 gap-y-6">
        {pairings.map((veg, index) => (
          <li key={index} className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer w-full">
              {/* Larger Checkbox for Better Click/Tap Accuracy */}
              <input
                type="checkbox"
                checked={selectedVegetables.includes(veg.name)}
                onChange={() => toggleSelection(veg.name)}
                className="h-6 w-6 border-2 border-black focus:ring-2 focus:ring-black 
                  appearance-none checked:bg-black checked:border-black shrink-0"
              />
              {/* Ingredient Name */}
              <span className="text-lg text-black leading-tight ml-3">{veg.name}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* Button - Increased Spacing Below List */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={fetchSpicesAndHerbs}
          className="px-6 py-3 w-full max-w-xs bg-black text-white font-semibold uppercase tracking-wide 
            border border-black hover:bg-white hover:text-black transition-all duration-200"
        >
          Find Spices & Herbs
        </button>
      </div>
    </div>
  );
}
