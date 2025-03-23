"use client";

import React from "react";
import { CheckCircle, Drumstick, Leaf, Flame, Sparkles, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

const stepIcons = [
  <Drumstick className="w-5 h-5" />, // Meat
  <Leaf className="w-5 h-5" />,      // Vegetables
  <Flame className="w-5 h-5" />,      // Spices
  <Sparkles className="w-5 h-5" />,   // Extras
  <ChefHat className="w-5 h-5" />     // AI + Recipe
];

export default function StepIndicatorV2({ currentStep, steps }) {
  return (
    <div className="relative flex items-center justify-center gap-4 sm:gap-10 mb-12">
      {/* Progress Line */}
      <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 z-0" />
      <motion.div
        className="absolute top-5 left-0 h-1 bg-black z-10"
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep - 1) * (100 / (steps.length - 1))}%` }}
        transition={{ duration: 0.4 }}
      />

      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;

        return (
          <div key={label} className="relative z-20 flex flex-col items-center text-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 
                ${isCompleted ? "bg-black text-white border-black" :
                  isActive ? "bg-white text-black border-black" : "bg-white text-gray-400 border-gray-300"}`}
              whileHover={{ scale: 1.1 }}
            >
              {isCompleted ? <CheckCircle className="w-5 h-5 text-white" /> : stepIcons[index]}
            </motion.div>
            <span className={`mt-2 text-sm uppercase font-medium tracking-wide ${isActive ? "text-black" : "text-gray-500"}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}