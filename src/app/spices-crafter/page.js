"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

// ⬇️ Import your blend components
import ZaatarBlend from "@/components/spicecrafter/ZaatarBlend";
import MasalaBlend from "@/components/spicecrafter/MasalaBlend";
import MediterraneanBlend from "@/components/spicecrafter/MediterraneanBlend";
import CajunBlend from "@/components/spicecrafter/CajunBlend";
import AfricanBerbereBlend from "@/components/spicecrafter/AfricanBerbereBlend";
import AdviehBlend from "@/components/spicecrafter/AdviehBlend";
import RasElHanoutBlend from "@/components/spicecrafter/RasElHanoutBlend";
import BahianBlend from "@/components/spicecrafter/BahianBlend";
import CreoleBlend from "@/components/spicecrafter/CreoleBlend";
import PersianRiceBlend from "@/components/spicecrafter/PersianRiceBlend";
import ThaiCoconutRiceBlend from "@/components/spicecrafter/ThaiCoconutRiceBlend";
import MexicanArrozRojoBlend from "@/components/spicecrafter/MexicanArrozRojoBlend";
import LebaneseSevenSpiceBlend from "@/components/spicecrafter/LebaneseSevenSpiceBlend";
import SpicyBlendExtended from "@/components/spicecrafter/SpicyBlendExtended";
import SriLankanBlend from "@/components/spicecrafter/SriLankanBlend";


const blendOptions = [
  { key: "zaatar", label: "Middle Eastern Za'atar Blend" },
  { key: "cajun", label: "Spicy Cajun Rice Blend" },
  { key: "masala", label: "Indian Masala Rice Blend" },
  { key: "mediterranean", label: "Mediterranean Herb Blend" },
  { key: "berbere", label: "African Berbere Spice Blend" },
  { key: "advieh", label: "Persian Advieh Blend" },
  { key: "raselhanout", label: "Moroccan Ras el Hanout Blend" },
  { key: "bahian", label: "Brazilian Bahian Seasoning" },
  { key: "creole", label: "Southern Creole Spice Rice Blend" },
  { key: "persianrice", label: "Persian Rice Spice Blend" },
  { key: "thaicoconut", label: "Thai Coconut Rice Blend" },
  { key: "mexican", label: "Mexican Arroz Rojo Spice Blend" },
  { key: "lebanese", label: "Lebanese Seven-Spice Rice Blend" },
  { key: "spicy-extended", label: "West African Jollof" },
  { key: "sri-lankan", label: "Sri Lankan Coconut & Curry Leaf Blend" },
];

export default function SpiceCrafterPage() {
  const [selectedBlend, setSelectedBlend] = useState(null);

  const renderBlendComponent = () => {
    switch (selectedBlend) {
      case "zaatar":
        return <ZaatarBlend />;
      case "masala":
        return <MasalaBlend />;
      case "cajun":
        return <CajunBlend />;
      case "mediterranean":
        return <MediterraneanBlend />;
      case "berbere":
        return <AfricanBerbereBlend />;
      case "advieh":
        return <AdviehBlend />;
      case "raselhanout":
        return <RasElHanoutBlend />;
      case "bahian":
        return <BahianBlend />;
      case "creole":
        return <CreoleBlend />;
      case "persianrice":
        return <PersianRiceBlend />;
      case "thaicoconut":
        return <ThaiCoconutRiceBlend />;
      case "mexican":
        return <MexicanArrozRojoBlend />;
      case "lebanese":
        return <LebaneseSevenSpiceBlend />;
      case "spicy-extended":
        return <SpicyBlendExtended />;
      case "sri-lankan":
        return <SriLankanBlend />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 md:px-10 lg:px-12">
      <h2 className="text-4xl sm:text-5xl font-bold mb-6">SpiceCrafter Blends</h2>
      <p className="text-base text-gray-700 mb-10 max-w-2xl">
        Click a blend to explore and adjust ingredients without leaving this page.
      </p>

      <div className="grid gap-4">
        {blendOptions.map((blend) => (
          <Dialog.Root key={blend.key}>
            <Dialog.Trigger asChild>
              <button
                onClick={() => setSelectedBlend(blend.key)}
                className="text-left px-5 py-3 border border-black rounded hover:bg-black hover:text-white transition-all"
              >
                {blend.label}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content
                className="fixed top-1/2 left-1/2 w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-xl space-y-4"
              >
                <div className="flex justify-between items-start">
                  <Dialog.Title className="text-xl font-bold"></Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="w-11 h-11 flex items-center justify-center text-black font-bold rounded-full">
                      <Cross2Icon className="w-6 h-6" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Dynamic Blend Content */}
                {renderBlendComponent()}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ))}
      </div>
    </div>
  );
}
