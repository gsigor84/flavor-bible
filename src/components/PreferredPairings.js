"use client";

import React, { useState, useEffect } from "react";

export default function PreferredPairings() {
  const [pairings, setPairings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    fetchPreferredPairings();
  }, []);

  const fetchPreferredPairings = async () => {
    try {
      const res = await fetch("/api/user-preferred-pairings");
      if (!res.ok) throw new Error("Failed to fetch pairings");

      const data = await res.json();
      setPairings(data.preferredPairings || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAllPairings = async () => {
    setIsClearing(true);
    try {
      const res = await fetch("/api/user-preferred-pairings", {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to clear pairings");

      setPairings([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsClearing(false);
    }
  };

  if (loading) return <p className="text-center text-lg mt-10">Loading pairings...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  // Group pairings by meat
  const groupedPairings = pairings.reduce((acc, pair) => {
    if (!acc[pair.meat]) acc[pair.meat] = [];
    acc[pair.meat].push(pair);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto py-16">
      {/* ✅ Title & Clear Button */}
      <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-8">
        <h2 className="text-4xl font-bold uppercase tracking-wide">Preferred Pairings</h2>
        {pairings.length > 0 && (
          <button
            onClick={clearAllPairings}
            disabled={isClearing}
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wide border border-black transition-all bg-black text-white hover:bg-white hover:text-black"
          >
            {isClearing ? "Clearing..." : "Clear All"}
          </button>
        )}
      </div>

      {/* ✅ No Pairings */}
      {pairings.length === 0 ? (
        <p className="text-lg text-gray-600">No preferred pairings found.</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedPairings).map(([meat, items], index) => (
            <div key={index} className="border-b border-black pb-4">
              <h3 className="text-2xl font-bold uppercase mb-2">{meat}</h3>
              {items.map((pair, idx) => (
                <div key={idx} className="pl-4 text-lg">
                  <p><strong>Vegetables:</strong> {pair.vegetables.join(", ")}</p>
                  <p><strong>Spices:</strong> {pair.spices.join(", ")}</p>
                  <p><strong>Extras:</strong> {pair.extra_pairings.join(", ")}</p>
                  {idx < items.length - 1 && <div className="my-2 border-b border-gray-300 w-3/4"></div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
