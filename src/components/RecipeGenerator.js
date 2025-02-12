"use client";

import React, { useState } from "react";

// Use Fly.io API URL from environment variable or fallback to localhost for local testing
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

export default function RecipeGenerator({ selectedMeat, selectedVegetables, selectedSpices, selectedExtras }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch the generated recipe
  const fetchRecipe = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meat: selectedMeat || "",
          vegetables: selectedVegetables.length ? selectedVegetables : [],
          spices: selectedSpices.length ? selectedSpices : [],
          extras: selectedExtras.length ? selectedExtras : [],
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch recipe. Status: ${response.status}`);
      }

      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to generate a recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4">
      {/* Divider */}
      <div className="w-full h-[2px] bg-black"></div>

      {/* Section Title */}
      <h4 className="text-2xl font-bold uppercase tracking-wide text-black text-left mb-6">
        AI-Generated Recipe
      </h4>

      {/* Generate Recipe Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={fetchRecipe}
          disabled={!selectedMeat || selectedVegetables.length === 0 || selectedSpices.length === 0}
          className={`px-6 py-3 font-semibold uppercase tracking-wide border border-black transition-all 
            ${selectedMeat && selectedVegetables.length && selectedSpices.length
              ? "bg-black text-white hover:bg-white hover:text-black"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
        >
          {loading ? "Generating Recipe..." : "Get Recipe"}
        </button>
      </div>

      {/* Error Handling */}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* Display the Recipe */}
      {recipe && (
        <div className="border border-gray-300 p-4 rounded-lg bg-gray-100">
          <h2 className="text-xl font-bold text-black mb-2">{recipe.title}</h2>

          <h3 className="font-semibold text-black">Ingredients:</h3>
          <ul className="list-disc pl-5 text-black">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-black mt-3">Instructions:</h3>
          <p className="text-black">{recipe.instructions}</p>

          <h3 className="font-semibold text-black mt-3">Tip:</h3>
          <p className="text-black italic">{recipe.tip}</p>
        </div>
      )}
    </div>
  );
}
