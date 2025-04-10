"use client";

import { useState } from "react";

const baseSauce = {
  "Pesto (basil or any variety)": 60,
  "Cranberry sauce": 50,
  "Mint sauce": 20,
  "Cooking vinegar (e.g., balsamic)": 10,
  "Olive oil": 15,
};

export default function MintyCranberryPestoStepper() {
  const [step, setStep] = useState(1);
  const [sauce, setSauce] = useState(baseSauce);

  const handleChange = (ingredient, newValue) => {
    const originalValue = baseSauce[ingredient];
    const ratio = newValue / originalValue;

    const newSauce = Object.entries(baseSauce).reduce((acc, [key, value]) => {
      const adjusted =
        key === ingredient ? newValue : Math.max(1, Math.round(value * ratio));
      acc[key] = adjusted;
      return acc;
    }, {});
    setSauce(newSauce);
  };

  const increment = (ingredient) => {
    handleChange(ingredient, sauce[ingredient] + 1);
  };

  const decrement = (ingredient) => {
    if (sauce[ingredient] > 1) {
      handleChange(ingredient, sauce[ingredient] - 1);
    }
  };

  const resetSauce = () => {
    setSauce(baseSauce);
    setStep(1);
  };

  const totalWeight = Object.values(sauce).reduce((acc, val) => acc + val, 0);

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
          {Object.entries(sauce).map(([ingredient, grams]) => (
            <div key={ingredient} className="flex items-center justify-between gap-2">
              <label className="w-32 text-sm text-gray-700">{ingredient}</label>
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
                  onChange={(e) =>
                    handleChange(ingredient, parseInt(e.target.value))
                  }
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
            <span>Total: {totalWeight}g</span>
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
          <p><strong>Total Weight:</strong> {totalWeight}g</p>
          <p><strong>How to Make:</strong> Blend or whisk together all ingredients until smooth. No cooking needed.</p>
          <p><strong>How to Use:</strong> Spread on lamb chops before grilling, or use as a topping for roasted root vegetables or a cheese platter.</p>
          <p><strong>Flavor Profile:</strong> Herby, tart, and fresh with a minty finish.</p>

          <div className="flex justify-between pt-4 border-t">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            >
              Back
            </button>
            <button
              onClick={resetSauce}
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
