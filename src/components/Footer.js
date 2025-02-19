"use client";

import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-12 w-full bg-[#0442BF] text-white py-12 px-4 sm:px-6 lg:px-12">
      {/* Footer Content Wrapper */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">

        {/* Branding & Copyright */}
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wide">Flavor Bible</h2>
          <p className="text-sm mt-2 opacity-80">
            &copy; {new Date().getFullYear()} Flavor Bible. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mt-6 sm:mt-0 space-x-6">
          <a href="/dashboard" className="text-sm font-medium hover:underline">Home</a>
          <a href="/about" className="text-sm font-medium hover:underline">About</a>
          <a href="/contact" className="text-sm font-medium hover:underline">Contact</a>
        </div>

        {/* Social Media Icons */}
        <div className="mt-6 sm:mt-0 flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300 transition">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition">
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
