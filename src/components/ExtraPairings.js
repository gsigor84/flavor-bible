"use client";

import React, { useEffect } from "react";

export default function ExtraPairings({
  selectedMeat,
  selectedVegetables = [],
  selectedSpices = [],
  extraPairings = [],
  setExtraPairings,
  selectedExtras = [],
  setSelectedExtras,
}) {
  useEffect(() => {
    if (Array.isArray(selectedSpices) && selectedSpices.length > 0) {
      fetchExtraPairings();
    }
  }, [selectedSpices]);

  const fetchExtraPairings = async () => {
    if (!selectedMeat || selectedVegetables.length === 0 || selectedSpices.length === 0) {
      return;
    }

    try {
      const response = await fetch(
        `/api/extra-pairings?meat=${encodeURIComponent(selectedMeat)}&vegetables=${encodeURIComponent(selectedVegetables.join(","))}&spices=${encodeURIComponent(selectedSpices.join(","))}`
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setExtraPairings(data.extra_pairings || []);
    } catch (error) {
      console.error("Error fetching extra pairings:", error);
    }
  };

  const toggleSelection = (item) => {
    setSelectedExtras((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 px-4">
      {/* Section Divider */}
      <div className="w-full h-[2px] bg-black mb-4"></div>

      {/* Section Title */}
      <h4 className="text-2xl font-bold uppercase tracking-wide text-black text-left mb-6">
        Extra Pairings
      </h4>

      {/* Extra Pairings List */}
      <ul className="grid grid-cols-2 gap-x-6 gap-y-6">
        {extraPairings.length > 0 ? (
          extraPairings.map((extra, index) => (
            <li key={index} className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedExtras.includes(extra.name)}
                onChange={() => toggleSelection(extra.name)}
                className="h-6 w-6 border-2 border-black focus:ring-2 focus:ring-black 
                  appearance-none checked:bg-black checked:border-black shrink-0"
              />
              <span className="text-lg text-black leading-tight">{extra.name}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 italic col-span-2">No extra pairings available.</p>
        )}
      </ul>
    </div>
  );
}
