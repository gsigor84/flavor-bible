"use client";

import React, { useEffect } from "react";

export default function ExtraPairings({
  selectedMeat,
  selectedVegetables = [],
  selectedSpices = [],
  extraPairings = [],
  setExtraPairings,
  selectedExtras = [],
  setSelectedExtras
}) {
  // Function to fetch extra pairings when spices change
  useEffect(() => {
    if (Array.isArray(selectedSpices) && selectedSpices.length > 0) {
      fetchExtraPairings();
    }
  }, [selectedSpices]);

  // Fetch extra pairings from API
  const fetchExtraPairings = async () => {
    if (!selectedMeat || !Array.isArray(selectedVegetables) || selectedVegetables.length === 0 || !Array.isArray(selectedSpices) || selectedSpices.length === 0) {
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

  // Function to toggle selection
  const toggleSelection = (item) => {
    setSelectedExtras((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );
  };

  return (
    <>
      {Array.isArray(extraPairings) && extraPairings.length > 0 && (
        <div className="w-full max-w-md mx-auto mt-6 px-4">
          {/* Section Divider */}
          <div className="w-full h-[2px] bg-black"></div>

          {/* Section Title - Consistent Alignment */}
          <h4 className="text-2xl font-bold uppercase tracking-wide text-black text-left mb-6">
            Extra Pairings
          </h4>

          {/* Extra Pairings List - Equal Spacing */}
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
            {extraPairings.map((extra, index) => (
              <li key={index} className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedExtras.includes(extra.name)}
                  onChange={() => toggleSelection(extra.name)}
                  className="h-5 w-5 border-2 border-black focus:ring-2 focus:ring-black appearance-none checked:bg-black checked:border-black shrink-0"
                />
                <span className="text-lg text-black leading-tight whitespace-nowrap">
                  {extra.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
