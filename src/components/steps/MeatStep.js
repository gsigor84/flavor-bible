"use client";

import React, { useEffect, useState } from "react";

export default function MeatStep({ selectedMeat, setSelectedMeat, setAvailableVegetables }) {
  const [meats, setMeats] = useState([]);
  const [localMeat, setLocalMeat] = useState(selectedMeat || "");

  useEffect(() => {
    const fetchMeats = async () => {
      const res = await fetch("/api/meat-categories");
      const data = await res.json();
      setMeats(data || []);
    };
    fetchMeats();
  }, []);

  useEffect(() => {
    if (!localMeat) return;

    // When meat is selected, fetch its vegetable pairings
    const fetchVegetables = async () => {
      const res = await fetch(`/api/pairings?ingredient=${localMeat}`);
      const data = await res.json();
      setAvailableVegetables(data.pairings || []);
      setSelectedMeat(localMeat);
    };

    fetchVegetables();
  }, [localMeat]);

  return (
    <div>
      <h3 className="text-2xl font-bold uppercase mb-4">Select a Meat</h3>
      <div className="w-1/4 h-1 bg-[#63A1F2] mb-6"></div>

      <select
        value={localMeat}
        onChange={(e) => setLocalMeat(e.target.value)}
        className="w-full max-w-xs p-3 border border-black"
      >
        <option value="">Choose a meat</option>
        {meats.map((meat) => (
          <option key={meat._id} value={meat.ingredient}>
            {meat.ingredient}
          </option>
        ))}
      </select>
    </div>
  );
}
