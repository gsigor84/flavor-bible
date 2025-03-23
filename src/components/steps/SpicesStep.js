"use client";

import React from "react";

export default function SpicesStep({ spicesAndHerbs = [], selectedSpices, setSelectedSpices }) {
  const toggleSelection = (spice) => {
    setSelectedSpices((prev) =>
      prev.includes(spice) ? prev.filter((s) => s !== spice) : [...prev, spice]
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-3xl font-bold uppercase mb-4">Select Spices & Herbs</h2>
      <div className="w-1/3 h-1 bg-[#63A1F2] mb-6" />

      {spicesAndHerbs.length === 0 ? (
        <p className="text-gray-600 italic">No spices or herbs suggested yet.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
          {spicesAndHerbs.map((spice, index) => (
            <li key={index} className="flex flex-col">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedSpices.includes(spice.name)}
                  onChange={() => toggleSelection(spice.name)}
                  className="w-5 h-5 border-black checked:bg-black"
                />
                <span>{spice.name}</span>
              </label>
              {spice.pairs_with && (
                <span className="text-sm italic text-gray-500 ml-8">
                  Pairs with: {spice.pairs_with.join(", ")}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
