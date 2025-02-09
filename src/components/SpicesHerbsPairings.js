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
        <div className="w-full max-w-md mx-auto mt-6 px-4">
          {/* Divider for section separation */}
          <div className="w-full h-[2px] bg-black"></div>

          {/* Section Title - Matches Other Sections */}
          <h4 className="text-2xl font-bold uppercase tracking-wide text-black text-left mb-6">
            Spices & Herbs Pairings
          </h4>

          {/* Spices & Herbs List - Consistent Spacing */}
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5">
            {spicesAndHerbs.map((spice, index) => (
              <li key={index} className="flex flex-col items-start">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedSpices.includes(spice.name)}
                    onChange={() => toggleSelection(spice.name)}
                    className="h-5 w-5 border-2 border-black focus:ring-2 focus:ring-black appearance-none checked:bg-black checked:border-black shrink-0"
                  />
                  <span className="text-lg font-semibold text-black leading-tight">
                    {spice.name}
                  </span>
                </div>
                {/* Pairs with - Slight Indentation */}
                {spice.pairs_with && spice.pairs_with.length > 0 && (
                  <span className="text-sm italic text-gray-600 block ml-6">
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
