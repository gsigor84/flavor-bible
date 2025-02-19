"use client";

import React from "react";
import NavBar from "./NavBar";

export default function NavWrapper({
  selectedMeat,
  selectedVegetables,
  selectedSpices,
  selectedExtras,
}) {
  return (
    <NavBar
      selectedMeat={selectedMeat}
      selectedVegetables={selectedVegetables}
      selectedSpices={selectedSpices}
      selectedExtras={selectedExtras}
    />
  );
}
