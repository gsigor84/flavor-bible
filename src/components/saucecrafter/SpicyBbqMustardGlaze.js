"use client";

import { useState } from "react";

const baseSauce = {
  "BBQ sauce (smoky variety)": 80,
  "Mustard (e.g., whole grain)": 30,
  "Hot chilli sauce (e.g., sriracha)": 20,
  "Cooking vinegar (e.g., apple cider)": 15,
  "Sugar": 10,
  "Worcester sauce": 5,
};

export default function SpicyBbqMustardGlazeStepper() {
  const [step, setStep] = useState(1);
  const [sauce, setSauce] = useState(baseSauce);

  const handleChange = (ingredient, newValue) => {
    const originalValue = baseSauce[ingredient];
    const ratio = newValue / originalValue;

    const newSauce = Object.entries(baseSauce).reduce((acc, [key, value]) => {
      const adjusted =
        key === ingredient
          ? newValue
          : Math.max(1, Math.round(value * ratio));
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
            <div
              key={ingredient}
              className="flex items-center justify-between gap-2"
            >
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
          <p><strong>How to Make:</strong> In a small saucepan, combine all ingredients. Heat over medium heat, stirring for 5–7 minutes until slightly thickened and well blended.</p>
          <p><strong>How to Use:</strong> Brush onto grilled chicken or pork during the last few minutes of cooking, or use as a dipping sauce for fries or veggies.</p>
          <p><strong>Flavor Profile:</strong> Smoky, tangy, spicy, with a mustard bite.</p>

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
