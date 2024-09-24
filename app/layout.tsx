"use client";
import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import "./globals.css"; // Ensure Tailwind is being imported

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <html lang="en">
      <body className="relative">
        <div className="absolute inset-0 z-0 grid grid-cols-10 grid-rows-10 w-full h-full">
          {Array.from({ length: 900 }).map((_, i) => (
            <div
              key={i}
              className={`w-full h-full ${getRandomColor()}`}
            />
          ))}
        </div>
        <div className="relative z-10 hidden md:block"> 
          {children}
        </div>
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-20 text-center text-lg p-4 md:hidden">
          <p>Get off your mobile device, u fat neek.</p>
        </div>
      </body>
    </html>
  );
}
