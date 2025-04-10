"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

// ⬇️ Import your sauce blend components
import SpicyBbqMustardGlaze from "@/components/saucecrafter/SpicyBbqMustardGlaze";
import CreamyPeriPeriTartare from "@/components/saucecrafter/CreamyPeriPeriTartare";
import SweetChilliSoyGlazeStepper from "@/components/saucecrafter/SweetChilliSoyGlazeStepper";
import MintyCranberryPestoStepper from "@/components/saucecrafter/MintyCranberryPestoStepper";
import SoyFishBBQFusionStepper from "@/components/saucecrafter/SoyFishBBQFusionStepper";
import AppleSaladCreamSauceStepper from "@/components/saucecrafter/AppleSaladCreamSauceStepper";
import SpicyBbqMustardChicken from "@/components/saucecrafter/SpicyBbqMustardChicken";
import CranberryBbqSauceStepper from "@/components/saucecrafter/CranberryBbqSauceStepper";
import MustardHorseradishSauceStepper from "@/components/saucecrafter/MustardHorseradishSauceStepper";
import WineGravyStepper from "@/components/saucecrafter/WineGravyStepper";

const sauceOptions = [
  { key: "bbqMustard", label: "Spicy BBQ Mustard Glaze" },
  { key: "creamytartare", label: "Creamy Peri-Peri Tartare" },
  { key: "sweetchillisoy", label: "Sweet Chilli Soy Glaze" },
  { key: "mintycranberry", label: "Minty Cranberry Pesto" },
  { key: "soyfish", label: "Soy Fish BBQ Fusion" },
  { key: "applesaladcream", label: "Apple Salad Cream Sauce" },
  { key: "spicybbqchicken", label: "Spicy BBQ Mustard Chicken" },
  { key: "cranberrybbq", label: "Cranberry BBQ Sauce" },
  { key: "mustardhorseradish", label: "Mustard Horseradish Sauce" },
  { key: "winegravy", label: "Wine Gravy" },

];

export default function SauceCrafterPage() {
  const [selectedSauce, setSelectedSauce] = useState(null);

  const renderSauceComponent = () => {
    switch (selectedSauce) {
      case "bbqMustard":
        return <SpicyBbqMustardGlaze />;
      case "creamytartare":
        return <CreamyPeriPeriTartare />;
      case "sweetchillisoy":
        return <SweetChilliSoyGlazeStepper />;
      case "mintycranberry":
        return <MintyCranberryPestoStepper />;
      case "soyfish":
        return <SoyFishBBQFusionStepper />;
      case "applesaladcream":
        return <AppleSaladCreamSauceStepper />;
      case "spicybbqchicken":
        return <SpicyBbqMustardChicken />;
      case "cranberrybbq":
        return <CranberryBbqSauceStepper />;
      case "mustardhorseradish":
        return <MustardHorseradishSauceStepper />;
      case "winegravy":
        return <WineGravyStepper />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 md:px-10 lg:px-12">
      <h2 className="text-4xl sm:text-5xl font-bold mb-6">SauceCrafter</h2>
      <p className="text-base text-gray-700 mb-10 max-w-2xl">
        Choose a sauce to explore, adjust quantities, and get preparation tips — all in one place.
      </p>

      <div className="grid gap-4">
        {sauceOptions.map((sauce) => (
          <Dialog.Root key={sauce.key}>
            <Dialog.Trigger asChild>
              <button
                onClick={() => setSelectedSauce(sauce.key)}
                className="text-left px-5 py-3 border border-black rounded hover:bg-black hover:text-white transition-all"
              >
                {sauce.label}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl space-y-4">
                <div className="flex justify-between items-start">
                  <Dialog.Title className="text-xl font-bold" />
                  <Dialog.Close asChild>
                    <button className="flex items-center justify-center text-black font-bold rounded-full">
                      <Cross2Icon className="w-6 h-6" />
                    </button>
                  </Dialog.Close>
                </div>
                {renderSauceComponent()}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ))}
      </div>
    </div>
  );
}
