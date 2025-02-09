"use client";
import React, { useState, useEffect } from "react";
import { useTrail, useSpring, a } from "@react-spring/web";

// Define words with individual spacing (No text, only chars)
const words = [
  ["I", "N", "T"], // First row (INT)
  ["E", "G", "R"], // Second row (EGR)
  ["A", "T", "I"], // Third row (ATI)
  ["O", "N"], // Fourth row (ON)
];

const Trail = ({ open }) => {
  const trail = useTrail(words.flat().length, {
    config: { mass: 2, tension: 1200, friction: 80 },
    opacity: open ? 1 : 0,
    y: open ? 0 : 20,
    from: { opacity: 0, y: 20 },
  });

  const [flippedStates, setFlippedStates] = useState(
    new Array(words.flat().length).fill(false)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFlippedStates((prev) =>
        prev.map((state, index) => (Math.random() > 0.7 ? !state : state))
      );
    }, 2000); // Random flips every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-y-[2vh] leading-none">
      {words.map((group, rowIndex) => (
        <div key={rowIndex} className="flex justify-center space-x-[4vw] w-full relative">
          {group.map((char, charIndex) => {
            const index = rowIndex * words[0].length + charIndex;
            const flipAnimation = useSpring({
              transform: flippedStates[index] ? "rotateY(180deg)" : "rotateY(0deg)",
              config: { tension: 500, friction: 30 },
            });

            return (
              <a.div
                key={index}
                style={{ ...trail[index], ...flipAnimation }}
                className="text-[16vw] font-black uppercase tracking-tighter text-[#63A1F2]"
              >
                {char}
              </a.div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Main Component
export default function TypographicArt() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#150259] via-[#2703A6] to-[#3805F2]">
      {/* Background Gradient using your palette */}
      <div className="relative">
        <Trail open={true} />
      </div>
    </div>
  );
}
