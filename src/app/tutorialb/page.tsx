"use client";
import React from "react";
import Image from "next/image";
import BackButton from "@/components/BackButtons";

export default function TutorialPage() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-white relative">
      {/* Header */}
      <div className="relative flex items-start pt-12 px-6">
        <BackButton />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start px-6 space-y-6 mt-12">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          How to Use Scooter B
        </h2>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/scooterb.png"
            alt="Scooter"
            width={300}
            height={200}
            className="object-contain rounded-lg"
          />
        </div>

        {/* Instructions */}
        <div className="flex flex-col w-full max-w-sm">
          <ol className="list-decimal list-inside text-gray-600 text-sm leading-relaxed space-y-4">
            <li>Scan QR code on handlebar to unlock the e-scooter.</li>
            <li>Check all equipment, including the brakes, and wear a helmet before you ride.</li>
            <li>Fold the kickstand up before sitting on the e-bike. Pedal more to gain faster acceleration.</li>
            <li>Stop pedaling or pull firmly on the brake levers on the handlebar.</li>
            <li>Place the vehicle back on its kickstand before ending the trip.</li>
          </ol>
        </div>
      </div>

      {/* Rent Button */}
      <div className="flex items-center justify-center mt-12">
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold text-[20px] w-[200px] h-[60px] rounded-[8px] transition">
          Rent Now
        </button>
      </div>
    </div>
  );
}
