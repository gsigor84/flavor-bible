"use client";

import React from "react";

export default function ExtrasStep({ extraPairings = [], selectedExtras, setSelectedExtras }) {
  const toggleSelection = (extra) => {
    setSelectedExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-3xl font-bold uppercase mb-4">Select Extra Pairings</h2>
      <div className="w-1/3 h-1 bg-[#63A1F2] mb-6" />

      {extraPairings.length === 0 ? (
        <p className="text-gray-600 italic">No extra pairings available.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
          {extraPairings.map((extra, index) => (
            <li key={index} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedExtras.includes(extra.name)}
                onChange={() => toggleSelection(extra.name)}
                className="w-5 h-5 border-black checked:bg-black"
              />
              <span>{extra.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
