"use client";

import { useState } from "react";

const baseMarinade = {
  "Sweet Chilli Sauce": 60,
  "Soy Sauce": 20,
  "Cooking Vinegar": 10,
  "Garlic (minced)": 10,
  "Ginger (grated)": 5,
};

export default function SweetChilliMarinadeStepper() {
  const [step, setStep] = useState(1);
  const [marinade, setMarinade] = useState(baseMarinade);

  const handleChange = (ingredient, newValue) => {
    const originalValue = baseMarinade[ingredient];
    const ratio = newValue / originalValue;

    const newMarinade = Object.entries(baseMarinade).reduce((acc, [key, value]) => {
      const adjusted = key === ingredient ? newValue : Math.max(1, Math.round(value * ratio));
      acc[key] = adjusted;
      return acc;
    }, {});
    setMarinade(newMarinade);
  };

  const increment = (ingredient) => {
    handleChange(ingredient, marinade[ingredient] + 1);
  };

  const decrement = (ingredient) => {
    if (marinade[ingredient] > 1) {
      handleChange(ingredient, marinade[ingredient] - 1);
    }
  };

  const resetMarinade = () => {
    setMarinade(baseMarinade);
    setStep(1);
  };

  const totalGrams = Object.values(marinade).reduce((acc, val) => acc + val, 0);

  return (
    <div className="max-w-md mx-auto p-4 bg-white space-y-6 rounded-xl">
      {/* Stepper Nav */}
      <div className="flex justify-between text-sm font-medium text-gray-600">
        <div className={`flex-1 text-center py-2 border-b-2 ${step === 1 ? "border-black font-bold text-black" : "border-gray-300"}`}>
          Adjust
        </div>
        <div className={`flex-1 text-center py-2 border-b-2 ${step === 2 ? "border-black font-bold text-black" : "border-gray-300"}`}>
          Instructions
        </div>
      </div>

      {/* Step 1: Adjust */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Adjust Quantities</h2>
          {Object.entries(marinade).map(([ingredient, grams]) => (
            <div key={ingredient} className="flex items-center justify-between gap-2">
              <label className="w-40 text-sm text-gray-700">{ingredient}</label>
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

          <div className="flex justify-between pt-4 border-t text-sm font-medium text-gray-700">
            <span>Total: {totalGrams}g</span>
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Instructions */}
      {step === 2 && (
        <div className="space-y-4 text-sm text-gray-800">
          <h2 className="text-2xl font-bold">Instructions</h2>
          <p><strong>Total:</strong> {totalGrams}g</p>
          <p><strong>How to Make:</strong> Mix all ingredients until combined.</p>
          <p><strong>How to Use:</strong> Ideal for chicken and pork. Great for grilling or roasting.</p>
          <p><strong>Marination Time:</strong> 1–2 hours.</p>

          <div className="flex justify-between pt-4 border-t">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            >
              Back
            </button>
            <button
              onClick={resetMarinade}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
