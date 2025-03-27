"use client";

import { useState } from "react";

const baseBlend = {
  oregano: 6,
  basil: 6,
  rosemary: 3,
  garlic: 3,
  onion: 3,
  pepper: 3,
};

export default function MediterraneanBlend() {
  const [blend, setBlend] = useState(baseBlend);

  const handleChange = (ingredient, newValue) => {
    const originalValue = baseBlend[ingredient];
    const ratio = newValue / originalValue;

    const newBlend = Object.entries(baseBlend).reduce((acc, [key, value]) => {
      const adjusted =
        key === ingredient ? newValue : Math.max(1, Math.round(value * ratio));
      acc[key] = adjusted;
      return acc;
    }, {});

    setBlend(newBlend);
  };

  const increment = (ingredient) => {
    handleChange(ingredient, blend[ingredient] + 1);
  };

  const decrement = (ingredient) => {
    if (blend[ingredient] > 1) {
      handleChange(ingredient, blend[ingredient] - 1);
    }
  };

  const resetBlend = () => {
    setBlend(baseBlend);
  };

  const totalGrams = Object.values(blend).reduce((acc, val) => acc + val, 0);

  return (
    <div className="p-6 max-w-md mx-auto bg-white space-y-6">
      <div className="flex items-center justify-start">
        <h2 className="text-2xl font-bold">Mediterranean Herb Blend (Grams)</h2>
      </div>

      <p className="text-sm text-gray-600">
        Adjust any ingredient and all others will scale proportionally.
      </p>

      <div className="space-y-4">
        {Object.entries(blend).map(([ingredient, grams]) => (
          <div key={ingredient} className="flex items-center justify-between gap-2">
            <label className="w-24 capitalize text-gray-700">{ingredient}:</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrement(ingredient)}
                className="px-2 py-1 text-lg font-bold border rounded hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                step="1"
                value={grams}
                onChange={(e) => handleChange(ingredient, parseInt(e.target.value))}
                className="w-16 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#63A1F2]"
              />
              <button
                onClick={() => increment(ingredient)}
                className="px-2 py-1 text-lg font-bold border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-700 font-medium pt-4 border-t">
        Total: {totalGrams}g
      </div>

      <button
        onClick={resetBlend}
        className="mt-4 w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Reset to Original
      </button>
    </div>
  );
}
