"use client"; // Required for Next.js 13+ with App Router

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1512058466835-da4d54fb0ee8?q=80&w=1532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[60vh] flex flex-col items-center justify-center overflow-hidden text-white">
      {/* Background Image Stack */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Animated Title */}
        <motion.h1
          className="text-3xl sm:text-6xl font-bold text-center px-4 leading-tight max-w-lg sm:max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Discover Flavor Combinations
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-sm sm:text-lg mt-2 sm:mt-4 max-w-[90%] sm:max-w-2xl mx-auto text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Unlock the secrets of perfect pairings—meats, vegetables, and spices blended to perfection.
        </motion.p>

        {/* Elegant Animated Divider */}
        <motion.div
          className="w-1/3 sm:w-1/4 h-[4px] mt-2 sm:mt-4 bg-white mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

    </div>
  );
}
