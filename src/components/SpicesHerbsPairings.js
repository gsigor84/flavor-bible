"use client";

import React from "react";

export default function SpicesHerbsPairings({ spicesAndHerbs = [], selectedSpices = [], setSelectedSpices }) {
  // Function to toggle selection
  const toggleSelection = (item) => {
    setSelectedSpices((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );
  };

  return (
    <>
      {spicesAndHerbs?.length > 0 && (
        <div className="w-full max-w-md mx-auto mt-8 px-4">
          {/* Divider for section separation */}
          <div className="w-full h-[2px] bg-black mb-4"></div>

          {/* Section Title */}
          <h4 className="text-2xl font-bold uppercase tracking-wide text-black text-left mb-6">
            Spices & Herbs Pairings
          </h4>

          {/* Spices & Herbs List - Improved Spacing & Touch Accessibility */}
          <ul className="grid grid-cols-2 gap-x-6 gap-y-6">
            {spicesAndHerbs.map((spice, index) => (
              <li key={index} className="flex flex-col items-start">
                <label className="flex items-center cursor-pointer w-full">
                  {/* Larger Checkbox for Touch Accessibility */}
                  <input
                    type="checkbox"
                    checked={selectedSpices.includes(spice.name)}
                    onChange={() => toggleSelection(spice.name)}
                    className="h-6 w-6 border-2 border-black focus:ring-2 focus:ring-black 
                      appearance-none checked:bg-black checked:border-black shrink-0"
                  />
                  <span className="text-lg font-semibold text-black leading-tight ml-3">
                    {spice.name}
                  </span>
                </label>

                {/* Pairs with - Enhanced Readability */}
                {spice.pairs_with && spice.pairs_with.length > 0 && (
                  <span className="text-sm italic text-gray-600 block ml-9">
                    Pairs with: {spice.pairs_with.join(", ")}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
