"use client";

import React, { useState, useEffect } from "react";
import VegetablePairings from "../components/VegetablePairings";
import SpicesHerbsPairings from "../components/SpicesHerbsPairings";
import ExtraPairings from "../components/ExtraPairings";
import AiPairings from "./AiPairings.js";
import RecipeGenerator from "../components/RecipeGenerator";
import { CheckCircle, Loader2 } from "lucide-react"; // ✅ Import icons

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
  const [saveMessage, setSaveMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/meat-categories")
      .then((res) => res.ok ? res.json() : Promise.reject("Failed to fetch meats."))
      .then((data) => setMeats(Array.isArray(data) ? data : []))
      .catch((error) => setErrorMessage(error));
  }, []);

  useEffect(() => {
    if (selectedMeatLocal) {
      resetSelections();
      fetch(`/api/pairings?ingredient=${selectedMeatLocal}`)
        .then((res) => res.ok ? res.json() : Promise.reject("Failed to retrieve pairings."))
        .then((data) => setPairings(data.pairings || []))
        .catch((error) => setErrorMessage(error));

      setSelectedMeat(selectedMeatLocal);
    }
  }, [selectedMeatLocal]);

  const fetchSpicesAndHerbs = async () => {
    if (!selectedMeatLocal || selectedVegetablesLocal.length === 0) {
      setErrorMessage("Please select a meat and at least one vegetable.");
      return;
    }
    try {
      const response = await fetch(`/api/spices-herbs?meat=${selectedMeatLocal}&vegetables=${selectedVegetablesLocal.join(",")}`);
      if (!response.ok) throw new Error("An error occurred while fetching spices & herbs.");
      const data = await response.json();
      setSpicesAndHerbs(data.spices_herbs || []);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const resetSelections = () => {
    setPairings([]);
    setSelectedVegetablesLocal([]);
    setSpicesAndHerbs([]);
    setSelectedSpicesLocal([]);
    setExtraPairings([]);
    setSelectedExtrasLocal([]);

    // ✅ Ensure parent state is updated
    setSelectedVegetables([]);
    setSelectedSpices([]);
    setSelectedExtras([]);
  };

  // ✅ Save Preferred Pairings
  const savePreferredPairings = async () => {
    if (!selectedMeatLocal || selectedVegetablesLocal.length === 0 || selectedSpicesLocal.length === 0) {
      setErrorMessage("⚠️ Please select at least one Meat, Vegetable, and Spice before saving.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    setSaveMessage("");

    const newPairing = {
      meat: selectedMeatLocal,
      vegetables: selectedVegetablesLocal,
      spices: selectedSpicesLocal,
      extra_pairings: selectedExtrasLocal,
    };

    try {
      const response = await fetch("/api/user-preferred-pairings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ preferredPairings: newPairing }),
      });

      if (!response.ok) {
        throw new Error("❌ Failed to save pairings.");
      }

      setSaveMessage("✅ Pairings saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setErrorMessage("❌ Error saving pairings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full mx-auto py-16">
      {/* STEP 1: SELECT MEAT */}
      {step === 1 && (
        <>
          <h2 className="text-4xl font-bold text-black uppercase tracking-wide mb-3 text-left">
            Select a Meat
          </h2>
          <div className="w-1/4 h-2 bg-[#63A1F2] mb-8"></div>

          <div className="relative w-full max-w-[300px] mb-12">
            <select
              value={selectedMeat}
              onChange={(e) => setSelectedMeat(e.target.value)}
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
        </>
      )}

      {/* STEP 2: VEGETABLE PAIRINGS */}
      {step === 2 && (
        <VegetablePairings
          pairings={pairings}
          selectedVegetables={selectedVegetables}
          setSelectedVegetables={setSelectedVegetables}
          fetchSpicesAndHerbs={fetchSpicesAndHerbs}
        />
      )}

      {/* STEP 3: SPICES + EXTRAS */}
      {step === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpicesHerbsPairings
            spicesAndHerbs={spicesAndHerbs}
            selectedSpices={selectedSpices}
            setSelectedSpices={setSelectedSpices}
          />
          <ExtraPairings
            selectedMeat={selectedMeat}
            selectedVegetables={selectedVegetables}
            selectedSpices={selectedSpices}
            extraPairings={extraPairings}
            setExtraPairings={setExtraPairings}
            selectedExtras={selectedExtras}
            setSelectedExtras={setSelectedExtras}
          />
        </div>
      )}

      {/* STEP 4: AI + SAVE */}
      {step === 4 && (
        <>
          <div className="mt-10 flex justify-end">
            <button
              onClick={savePreferredPairings}
              disabled={isSaving}
              className={`px-6 py-3 text-lg font-semibold uppercase tracking-wide border border-black transition-all flex items-center gap-2 
                ${isSaving ? "bg-gray-500 text-white cursor-not-allowed" : "bg-black text-white hover:bg-white hover:text-black"}
              `}
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle size={20} />}
              {isSaving ? "Saving..." : saveMessage ? "✓ Saved!" : "Save Pairings"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-start w-full justify-start">
            <AiPairings
              selectedMeat={selectedMeat}
              selectedVegetables={selectedVegetables}
              selectedSpices={selectedSpices}
              selectedExtras={selectedExtras}
            />
            <RecipeGenerator
              selectedMeat={selectedMeat}
              selectedVegetables={selectedVegetables}
              selectedSpices={selectedSpices}
              selectedExtras={selectedExtras}
            />
          </div>
        </>
      )}
    </div>
  );
}  