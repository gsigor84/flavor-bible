"use client"; // ✅ Ensure this is a client component

import React, { useState, useEffect } from "react";
import VegetablePairings from "../components/VegetablePairings";
import SpicesHerbsPairings from "../components/SpicesHerbsPairings";
import ExtraPairings from "../components/ExtraPairings";
import AiPairings from "./AiPairings.js";
import RecipeGenerator from "../components/RecipeGenerator";

export default function MeatPairings({ setSelectedMeat, setSelectedVegetables, setSelectedSpices, setSelectedExtras }) {
  const [meats, setMeats] = useState([]);
  const [selectedMeatLocal, setSelectedMeatLocal] = useState("");
  const [pairings, setPairings] = useState([]);
  const [selectedVegetablesLocal, setSelectedVegetablesLocal] = useState([]);
  const [spicesAndHerbs, setSpicesAndHerbs] = useState([]);
  const [selectedSpicesLocal, setSelectedSpicesLocal] = useState([]);
  const [extraPairings, setExtraPairings] = useState([]);
  const [selectedExtrasLocal, setSelectedExtrasLocal] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Fetch available meats when the component mounts
  useEffect(() => {
    fetch("/api/meat-categories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch meats.");
        return res.json();
      })
      .then((data) => setMeats(Array.isArray(data) ? data : []))
      .catch((error) => setErrorMessage(error.message));
  }, []);

  // ✅ Fetch pairings when a meat is selected
  useEffect(() => {
    if (selectedMeatLocal) {
      resetSelections();
      fetch(`/api/pairings?ingredient=${selectedMeatLocal}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to retrieve pairings, try again later.");
          return res.json();
        })
        .then((data) => setPairings(data.pairings || []))
        .catch((error) => setErrorMessage(error.message));

      // ✅ Pass the selected meat up to Dashboard/NavBar
      setSelectedMeat(selectedMeatLocal);
    }
  }, [selectedMeatLocal]);

  // ✅ Fetch spices & herbs after vegetables are selected
  const fetchSpicesAndHerbs = async () => {
    if (!selectedMeatLocal || selectedVegetablesLocal.length === 0) {
      setErrorMessage("Please select a meat and at least one vegetable.");
      return;
    }
    setErrorMessage("");
    try {
      const response = await fetch(
        `/api/spices-herbs?meat=${encodeURIComponent(selectedMeatLocal)}&vegetables=${encodeURIComponent(selectedVegetablesLocal.join(","))}`
      );
      if (!response.ok) throw new Error("An error occurred while fetching spices & herbs.");
      const data = await response.json();
      setSpicesAndHerbs(data.spices_herbs || []);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // ✅ Fetch extra pairings when spices are selected
  const fetchExtraPairings = async () => {
    if (!selectedMeatLocal || selectedVegetablesLocal.length === 0 || selectedSpicesLocal.length === 0) return;
    try {
      const response = await fetch(
        `/api/extra-pairings?meat=${encodeURIComponent(selectedMeatLocal)}&vegetables=${encodeURIComponent(selectedVegetablesLocal.join(","))}&spices=${encodeURIComponent(selectedSpicesLocal.join(","))}`
      );
      if (!response.ok) throw new Error("Failed to fetch extra pairings.");
      const data = await response.json();
      setExtraPairings(data.extra_pairings || []);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // ✅ Reset selections when a new meat is chosen
  const resetSelections = () => {
    setPairings([]);
    setSelectedVegetablesLocal([]);
    setSpicesAndHerbs([]);
    setSelectedSpicesLocal([]);
    setExtraPairings([]);
    setSelectedExtrasLocal([]);

    // ✅ Clear state in Dashboard/NavBar
    setSelectedVegetables([]);
    setSelectedSpices([]);
    setSelectedExtras([]);
  };

  return (
    <div className="w-full mx-auto py-16">
      {/* Error Notification */}
      {errorMessage && (
        <div className="bg-red-500 text-white text-center p-3 mb-4">
          {errorMessage}
        </div>
      )}

      <h2 className="text-4xl font-bold text-black uppercase tracking-wide mb-6 text-left">
        Select a Meat
      </h2>

      <div className="relative w-full max-w-[300px] mb-8">
        <select
          value={selectedMeatLocal}
          onChange={(e) => setSelectedMeatLocal(e.target.value)}
          className="w-full p-3 text-lg font-semibold text-black bg-white focus:ring-2"
        >
          <option value="">Choose a meat</option>
          {meats.map((meat) => (
            <option key={meat._id} value={meat.ingredient}>
              {meat.ingredient}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VegetablePairings
          pairings={pairings}
          selectedVegetables={selectedVegetablesLocal}
          setSelectedVegetables={(selected) => {
            setSelectedVegetablesLocal(selected);
            setSelectedVegetables(selected);
          }}
          fetchSpicesAndHerbs={fetchSpicesAndHerbs}
        />

        <SpicesHerbsPairings
          spicesAndHerbs={spicesAndHerbs}
          selectedSpices={selectedSpicesLocal}
          setSelectedSpices={(selected) => {
            setSelectedSpicesLocal(selected);
            setSelectedSpices(selected);
          }}
        />

        <ExtraPairings
          selectedMeat={selectedMeatLocal}
          selectedVegetables={selectedVegetablesLocal}
          selectedSpices={selectedSpicesLocal}
          extraPairings={extraPairings}
          setExtraPairings={setExtraPairings}
          selectedExtras={selectedExtrasLocal}
          setSelectedExtras={(selected) => {
            setSelectedExtrasLocal(selected);
            setSelectedExtras(selected);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-start w-full justify-start">
        <AiPairings
          selectedMeat={selectedMeatLocal}
          selectedVegetables={selectedVegetablesLocal}
          selectedSpices={selectedSpicesLocal}
          selectedExtras={selectedExtrasLocal}
        />
        <RecipeGenerator
          selectedMeat={selectedMeatLocal}
          selectedVegetables={selectedVegetablesLocal}
          selectedSpices={selectedSpicesLocal}
          selectedExtras={selectedExtrasLocal}
        />
      </div>
    </div >
  );
}
