import React, { useState, useEffect } from "react";
import MeatStep from "./steps/MeatStep";
import VegetablesStep from "./steps/VegetablesStep";
import SpicesStep from "./steps/SpicesStep";
import ExtrasStep from "./steps/ExtrasStep";
import AiPairings from "./AiPairings";
import RecipeGenerator from "./RecipeGenerator";
import StepIndicator from "./StepIndicator";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const maxStep = 5;

  const [selectedMeat, setSelectedMeat] = useState("");
  const [availableVegetables, setAvailableVegetables] = useState([]);
  const [selectedVegetables, setSelectedVegetables] = useState([]);

  const [spicesAndHerbs, setSpicesAndHerbs] = useState([]);
  const [selectedSpices, setSelectedSpices] = useState([]);

  const [extraPairings, setExtraPairings] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const steps = ["Meat", "Vegetables", "Spices", "Extras", "Recipe"];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const fetchSpicesAndHerbs = async () => {
    if (!selectedMeat || selectedVegetables.length === 0) return;
    const res = await fetch(
      `/api/spices-herbs?meat=${selectedMeat}&vegetables=${selectedVegetables.join(",")}`
    );
    const data = await res.json();
    setSpicesAndHerbs(data.spices_herbs || []);
  };

  useEffect(() => {
    const fetchExtras = async () => {
      if (!selectedMeat || selectedVegetables.length === 0 || selectedSpices.length === 0) return;
      const res = await fetch(
        `/api/extra-pairings?meat=${selectedMeat}&vegetables=${selectedVegetables.join(",")}&spices=${selectedSpices.join(",")}`
      );
      const data = await res.json();
      setExtraPairings(data.extra_pairings || []);
    };

    fetchExtras();
  }, [selectedSpices]);

  const nextStep = async () => {
    if (step === 2) {
      await fetchSpicesAndHerbs();
    }
    setStep((prev) => Math.min(prev + 1, maxStep));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-12">


      <StepIndicator currentStep={step} steps={steps} />

      <div className="flex justify-center gap-4 my-10">
        {step > 1 && (
          <button onClick={prevStep} className="px-4 py-2 border border-black text-black">
            Previous
          </button>
        )}
        {step < maxStep && (
          <button onClick={nextStep} className="px-4 py-2 border border-black text-black">
            Next
          </button>
        )}
      </div>

      {step === 1 && (
        <MeatStep
          selectedMeat={selectedMeat}
          setSelectedMeat={setSelectedMeat}
          setAvailableVegetables={setAvailableVegetables}
        />
      )}

      {step === 2 && (
        <VegetablesStep
          pairings={availableVegetables}
          selectedVegetables={selectedVegetables}
          setSelectedVegetables={setSelectedVegetables}
        />
      )}

      {step === 3 && (
        <SpicesStep
          spicesAndHerbs={spicesAndHerbs}
          selectedSpices={selectedSpices}
          setSelectedSpices={setSelectedSpices}
        />
      )}

      {step === 4 && (
        <ExtrasStep
          extraPairings={extraPairings}
          selectedExtras={selectedExtras}
          setSelectedExtras={setSelectedExtras}
        />
      )}

      {step === 5 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
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
      )}
    </div>
  );
}