"use client";

import React, { useState, useEffect } from "react";
import VegetablePairings from "../components/VegetablePairings";
import SpicesHerbsPairings from "../components/SpicesHerbsPairings";
import ExtraPairings from "../components/ExtraPairings";
import AiPairings from "./AiPairings.js";
import RecipeGenerator from "../components/RecipeGenerator";

export default function MeatPairings() {
  const [meats, setMeats] = useState([]);
  const [selectedMeat, setSelectedMeat] = useState("");
  const [pairings, setPairings] = useState([]);
  const [selectedVegetables, setSelectedVegetables] = useState([]);
  const [spicesAndHerbs, setSpicesAndHerbs] = useState([]);
  const [selectedSpices, setSelectedSpices] = useState([]);
  const [extraPairings, setExtraPairings] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [noMatchMessage, setNoMatchMessage] = useState("");

  useEffect(() => {
    fetch("/api/meat-categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMeats(data);
      })
      .catch((error) => console.error("Error fetching meats:", error));
  }, []);

  useEffect(() => {
    if (selectedMeat) {
      resetSelections();
      fetch(`/api/pairings?ingredient=${selectedMeat}`)
        .then((res) => res.json())
        .then((data) => setPairings(data.pairings || []))
        .catch((error) => console.error("Error fetching pairings:", error));
    }
  }, [selectedMeat]);

  useEffect(() => {
    if (selectedSpices.length > 0) {
      fetchExtraPairings();
    }
  }, [selectedSpices]);

  const fetchExtraPairings = async () => {
    if (!selectedMeat || selectedVegetables.length === 0 || selectedSpices.length === 0) return;

    try {
      const response = await fetch(
        `/api/extra-pairings?meat=${encodeURIComponent(selectedMeat)}&vegetables=${encodeURIComponent(selectedVegetables.join(","))}&spices=${encodeURIComponent(selectedSpices.join(","))}`
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setExtraPairings(data.extra_pairings || []);
    } catch (error) {
      console.error("Error fetching extra pairings:", error);
    }
  };

  const resetSelections = () => {
    setPairings([]);
    setSelectedVegetables([]);
    setSpicesAndHerbs([]);
    setSelectedSpices([]);
    setExtraPairings([]);
    setSelectedExtras([]);
  };

  const fetchSpicesAndHerbs = async () => {
    if (!selectedMeat || selectedVegetables.length === 0) {
      console.log("Please select both a meat and at least one vegetable.");
      setNoMatchMessage("Please select a meat and at least one vegetable.");
      return;
    }

    setNoMatchMessage("");

    try {
      const response = await fetch(
        `/api/spices-herbs?meat=${encodeURIComponent(selectedMeat)}&vegetables=${encodeURIComponent(selectedVegetables.join(","))}`
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setSpicesAndHerbs(data.spices_herbs || []);
    } catch (error) {
      console.error("Error fetching spices & herbs:", error);
      setNoMatchMessage("An error occurred while fetching data.");
    }
  };

  return (
    <div className="w-full mx-auto py-16">

      {/* Section Title */}
      <h2 className="text-4xl font-bold text-black uppercase tracking-wide mb-6 text-left">
        Select a Meat
      </h2>

      {/* Meat Dropdown */}
      <div className="relative w-full max-w-[300px] mb-8">
        <select
          value={selectedMeat}
          onChange={(e) => setSelectedMeat(e.target.value)}
          className="w-full p-3 text-lg font-semibold text-black bg-white  focus:ring-2 "
        >
          <option value="">Choose a meat</option>
          {meats.map((meat) => (
            <option key={meat._id} value={meat.ingredient}>
              {meat.ingredient}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 3-Column Layout for Pairings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col">


          <VegetablePairings {...{ pairings, selectedVegetables, setSelectedVegetables, fetchSpicesAndHerbs }} />
        </div>

        <div className="flex flex-col">


          <SpicesHerbsPairings {...{ spicesAndHerbs, selectedSpices, setSelectedSpices }} />
        </div>

        <div className="flex flex-col">

          <ExtraPairings {...{ selectedMeat, selectedVegetables, selectedSpices, extraPairings, setExtraPairings, selectedExtras, setSelectedExtras }} />
        </div>
      </div>

      {/* 🔹 2-Column Layout for Recipe & AI Pairings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-start">
        <div className="flex flex-col h-full">
          <AiPairings {...{ selectedMeat, selectedVegetables, selectedSpices, selectedExtras }} />
        </div>

        <div className="flex flex-col h-full">
          <RecipeGenerator {...{ selectedMeat, selectedVegetables, selectedSpices, selectedExtras }} />

        </div>
      </div>
    </div>
  );
}
