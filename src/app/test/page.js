"use client";

import { useState } from "react";

const baseBlend = {
  thyme: 6,
  sumac: 6,
  sesame: 5,
  oregano: 3,
  marjoram: 2,
  salt: 1,
};

export default function ZaatarBlend() {
  const [blend, setBlend] = useState(baseBlend);
  const [activeIngredient, setActiveIngredient] = useState(null);

  const handleChange = (ingredient, newValue) => {
    const originalValue = baseBlend[ingredient];
    const ratio = newValue / originalValue;

    const newBlend = Object.entries(baseBlend).reduce((acc, [key, value]) => {
      const adjusted =
        key === ingredient
          ? newValue
          : Math.max(1, Math.round(value * ratio)); // prevent 0g
      acc[key] = adjusted;
      return acc;
    }, {});

    setBlend(newBlend);
    setActiveIngredient(ingredient);
  };

  const resetBlend = () => {
    setBlend(baseBlend);
    setActiveIngredient(null);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Za’atar Blend (Whole Grams)</h2>

      <p className="text-sm text-gray-600">
        Change any ingredient below — others will adjust proportionally.
      </p>

      <div className="space-y-3">
        {Object.entries(blend).map(([ingredient, grams]) => (
          <div key={ingredient} className="flex items-center gap-4">
            <label className="w-24 capitalize text-gray-700">
              {ingredient}:
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={grams}
              onChange={(e) =>
                handleChange(ingredient, parseInt(e.target.value))
              }
              className="w-24 border border-gray-300 rounded px-2 py-1"
            />
            {activeIngredient === ingredient && (
              <span className="text-xs text-green-600">(scaled)</span>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={resetBlend}
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Reset to Original
      </button>
    </div>
  );
}
