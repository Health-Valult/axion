"use client";
import { useState } from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Switch = ({ checked, onCheckedChange }: SwitchProps) => {
  console.log("Switch checked state:", checked); // Debugging

  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`relative w-12 h-6 flex items-center rounded-full border transition-colors
        ${checked ? "bg-blue-500 border-blue-500" : "bg-gray-300 border-gray-300"}`}
    >
      <div
        className={`absolute left-1 h-4 w-4 rounded-full bg-white shadow transition-transform
          ${checked ? "translate-x-6" : "translate-x-0"}`}
      />
    </button>
  );
};

export default Switch;
