"use client";

import React, { useState } from "react";

// Use Fly.io API URL from environment variable or fallback to localhost for local testing
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

// Force API calls to use the local Flask server on port 8080
//const API_BASE_URL = "http://127.0.0.1:8080"; // Local development only


export default function AiPairings({ selectedMeat, selectedVegetables, selectedSpices, selectedExtras }) {
  const [aiPairings, setAiPairings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch AI-based pairing suggestions
  const fetchAiPairings = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/ai-pairings`, {
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
        throw new Error(`Failed to fetch AI pairings. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Sending AI Pairings Request:", {
        meat: selectedMeat,
        vegetables: selectedVegetables,
        spices: selectedSpices,
        extras: selectedExtras,
      });


      // Ensure `data.ai_pairings` is an array before setting state
      if (Array.isArray(data.ai_pairings)) {
        setAiPairings(data.ai_pairings);
      } else {
        throw new Error("Invalid AI response format");
      }
    } catch (error) {
      console.error("Error fetching AI pairings:", error);
      setError("Failed to load AI pairings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4">
      {/* Section Divider */}
      <div className="w-full h-[2px] bg-black mb-6"></div>

      {/* AI Pairing Title */}
      <h4 className="text-2xl font-bold uppercase tracking-wide text-black text-left mb-6">
        AI Pairing Suggestions
      </h4>

      {/* AI Pairing Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={fetchAiPairings}
          disabled={!selectedMeat || selectedVegetables.length === 0 || selectedSpices.length === 0}
          className="w-full px-6 py-3 text-center font-semibold uppercase tracking-wide border border-black transition-all 
             bg-black text-white hover:bg-white hover:text-black 
             disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
        >
          {loading ? "Fetching AI Pairings..." : "Get AI Pairings"}
        </button>
      </div>

      {/* Error Handling */}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* AI Suggested Pairings List */}
      {aiPairings.length > 0 && (
        <ul className="grid grid-cols-1 gap-y-4">
          {aiPairings.map((pair, index) => (
            <li key={index} className="text-lg text-black leading-tight border-b border-gray-300 pb-3">
              <span className="font-bold block mb-1">{pair.pairing}</span>
              <span className="text-gray-700 text-sm">{pair.tip}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
