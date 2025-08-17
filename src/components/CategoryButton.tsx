"use client";
import React from "react";
import localFont from "next/font/local";

const dg = localFont({
  src: "../../src/fonts/DungGeunMo.ttf", // adjust path if needed
  weight: "400",
  style: "normal",
  display: "swap",
});

interface CategoryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function CategoryButton({
  children,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${dg.className} text-gray-600 rounded-full text-[32px] transition-all duration-200 w-auto hover:border-[#64DA87] px-4 py-2 active:text-[#64DA87]`}
    >
      {children}
    </button>
  );
}
