"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUtensils, FaCarrot, FaPepperHot, FaConciergeBell } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 lg:px-12 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold uppercase tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How <span className="text-[#63A1F2]">Flavor Bible</span> Works
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Select ingredients and discover the <strong>perfect</strong> pairings for your dish!
        </motion.p>
      </section>

      {/* Step-by-step explanation */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {[
          { icon: FaUtensils, title: "Choose a Meat" },
          { icon: FaCarrot, title: "Add Vegetables" },
          { icon: FaPepperHot, title: "Select Spices & Herbs" },
          { icon: FaConciergeBell, title: "Discover Extra Pairings" },
        ].map((step, index) => (
          <motion.div
            key={index}
            className="p-6 border border-gray-300 shadow-md rounded-md bg-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <step.icon className="text-3xl text-[#63A1F2] mb-2 mx-auto" />
            <h3 className="font-semibold text-lg uppercase">{step.title}</h3>
          </motion.div>
        ))}
      </section>

      {/* About Flavor Bible */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-black mb-4">What is <span className="text-[#63A1F2]">Flavor Bible</span>?</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to <strong>Flavor Bible</strong>, your go-to guide for discovering the best ingredient pairings
          to enhance your culinary experience. Whether you're a home cook or a professional chef, our platform helps you
          explore unique flavor combinations to create extraordinary dishes.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4">Why Choose Flavor Bible?</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700">
          <li>Discover unique ingredient pairings.</li>
          <li>AI-generated recipe suggestions.</li>
          <li>Save your favorite pairings for future use.</li>
          <li>Improve your cooking with data-driven insights.</li>
        </ul>
      </section>
    </div>
  );
}
