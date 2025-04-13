"use client";

import React, { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";

// ✅ Import your marinade component
import AsianInspiredMarinade from "@/components/marinationmaster/AsianInspiredMarinade";
import TangyMustardMarinade from "@/components/marinationmaster/TangyMustardMarinade";
import FruityMarinadeStepper from "@/components/marinationmaster/FruityMarinadeStepper";
import SpicyMarinadeStepper from "@/components/marinationmaster/SpicyMarinadeStepper";
import HerbaceousMarinadeStepper from "@/components/marinationmaster/HerbaceousMarinadeStepper";
import SweetChilliMarinadeStepper from "@/components/marinationmaster/SweetChilliMarinadeStepper";
import CitrusSoyMarinadeStepper from "@/components/marinationmaster/CitrusSoyMarinadeStepper";
import BbqMarinadeStepper from "@/components/marinationmaster/BbqMarinadeStepper";
import MayoPestoMarinadeStepper from "@/components/marinationmaster/MayoPestoMarinadeStepper";
import SaladCreamHorseradishMarinadeStepper from "@/components/marinationmaster/SaladCreamHorseradishMarinadeStepper";
import NandosMayoMarinadeStepper from "@/components/marinationmaster/NandosMayoMarinadeStepper";
import CranberryAppleMarinadeStepper from "@/components/marinationmaster/CranberryAppleMarinadeStepper";


export default function MarinationMasterPage() {
  const [selectedMarinade, setSelectedMarinade] = useState(null);

  const marinadeOptions = [
    { key: "asianinspired", label: "Asian-Inspired Marinade" },
    { key: "tangymustard", label: "Tangy Mustard Marinade" },
    { key: "fruity", label: "Fruity Marinade" },
    { key: "spicy", label: "Spicy Marinade" },
    { key: "herbaceous", label: "Herbaceous Marinade" },
    { key: "sweetchilli", label: "Sweet Chilli Marinade" },
    { key: "citrussoy", label: "Citrus-Soy Marinade" },
    { key: "bbqmarinade", label: "BBQ Marinade" },
    { key: "mayopesto", label: "Mayo-Pesto Marinade" },
    { key: "saladhorseradish", label: "Salad Cream-Horseradish Marinade" },
    { key: "nandosmayo", label: "Nando's-Mayo Marinade" },
    { key: "cranberryapple", label: "Cranberry-Apple Marinade" },

    // Add more as needed
  ];

  const renderMarinadeComponent = () => {
    switch (selectedMarinade) {
      case "asianinspired":
        return <AsianInspiredMarinade />;
      case "tangymustard":
        return <TangyMustardMarinade />;
      case "fruity":
        return <FruityMarinadeStepper />;
      case "spicy":
        return <SpicyMarinadeStepper />;
      case "herbaceous":
        return <HerbaceousMarinadeStepper />;
      case "sweetchilli":
        return <SweetChilliMarinadeStepper />;
      case "citrussoy":
        return <CitrusSoyMarinadeStepper />;
      case "bbqmarinade":
        return <BbqMarinadeStepper />;
      case "mayopesto":
        return <MayoPestoMarinadeStepper />;
      case "saladhorseradish":
        return <SaladCreamHorseradishMarinadeStepper />;
      case "nandosmayo":
        return <NandosMayoMarinadeStepper />;
      case "cranberryapple":
        return <CranberryAppleMarinadeStepper />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 md:px-10 lg:px-12">
      <h2 className="text-4xl sm:text-5xl font-bold mb-6">Marination Master</h2>
      <p className="text-base text-gray-700 mb-10 max-w-2xl">
        Choose a marinade and explore flavor-building combinations for meats.
      </p>

      <div className="grid gap-4">
        {marinadeOptions.map((item) => (
          <Dialog.Root key={item.key}>
            <Dialog.Trigger asChild>
              <button
                onClick={() => setSelectedMarinade(item.key)}
                className="text-left px-5 py-3 border border-black rounded hover:bg-black hover:text-white transition-all"
              >
                {item.label}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content
                className="fixed top-1/2 left-1/2 w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl space-y-4"
              >
                <div className="flex justify-between items-start">
                  <Dialog.Title className="text-xl font-bold">Marinade Details</Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="flex items-center justify-center text-black font-bold rounded-full">
                      <Cross2Icon className="w-6 h-6" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Dynamic Marinade Content */}
                {renderMarinadeComponent()}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ))}
      </div>
    </div>
  );
}
