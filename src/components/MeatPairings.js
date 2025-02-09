"use client";

import React, { useState, useEffect } from "react";
import VegetablePairings from "../components/VegetablePairings";
import SpicesHerbsPairings from "../components/SpicesHerbsPairings";
import ExtraPairings from "../components/ExtraPairings";

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

  const toggleSelection = (item, setSelectedList) => {
    setSelectedList((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );
  };

  const fetchSpicesAndHerbs = async () => {
    if (!selectedMeat || selectedVegetables.length === 0) {
      setSpicesAndHerbs([]);
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
    <div className="w-full mx-0 px-0 my-20">
      {/* ✅ Title Aligned to the Left */}
      <h2 className="text-3xl font-bold text-black uppercase tracking-wide mb-6 text-left">
        Select a Meat
      </h2>

      {/* ✅ Meat Dropdown - Left Aligned */}
      <div className="relative w-full max-w-[250px]">
        <select
          value={selectedMeat}
          onChange={(e) => setSelectedMeat(e.target.value)}
          className="w-full p-2 text-lg font-medium text-black bg-white outline-none focus:ring-0 focus:outline-none appearance-none pr-8"
        >
          <option value="">Choose a meat</option>
          {meats.map((meat) => (
            <option key={meat._id} value={meat.ingredient}>
              {meat.ingredient}
            </option>
          ))}
        </select>
        {/* Custom Arrow */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          ▼
        </div>
      </div>

      {/* ✅ Grid Layout (Left Aligned, Fixed Width for Pairing Names) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6 mt-6 items-start w-full">
        {/* Vegetable Pairings */}
        <div className="w-full">
          <VegetablePairings
            pairings={pairings}
            selectedVegetables={selectedVegetables}
            setSelectedVegetables={setSelectedVegetables}
            fetchSpicesAndHerbs={fetchSpicesAndHerbs}
          />
        </div>

        {/* Spices & Herbs Pairings */}
        <div className="w-full">
          <SpicesHerbsPairings
            spicesAndHerbs={spicesAndHerbs}
            selectedSpices={selectedSpices}
            setSelectedSpices={setSelectedSpices}
          />
        </div>

        {/* Extra Pairings */}
        <div className="w-full">
          <ExtraPairings
            extraPairings={extraPairings}
            selectedExtras={selectedExtras}
            setSelectedExtras={setSelectedExtras}
          />
        </div>
      </div>
    </div>
  );
}
