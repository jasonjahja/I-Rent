"use client";
import React, { useState, useRef } from "react";
import ScooterCard from "../../components/ScooterCard";
import BackButton from "../../components/BackButtons";
import Image from "next/image";

export default function MapsPage() {
  const [dragPosition, setDragPosition] = useState(0);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startY.current = e.touches[0].clientY - currentY.current;
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;

    const yPos = e.touches[0].clientY - startY.current;
    if (yPos >= 0 && yPos <= 600) {
      currentY.current = yPos;
      setDragPosition(yPos);
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    isDragging.current = false;

    // Snap the container into position
    if (currentY.current > 300) {
      setDragPosition(250); // Fully open
      currentY.current = 250;
    } else {
      setDragPosition(0); // Minimized
      currentY.current = 0;
    }
  };

  return (
    <main className="w-[430px] h-[932px] mx-auto bg-gray-100 flex flex-col items-center overflow-hidden">
      {/* Top Bar */}
      <div className="absolute z-10 flex items-center w-full p-4">
        <BackButton />

        <div className="p-2 ml-12">
          <i
            className="fa fa-search relative left-10 text-gray-500"
            aria-hidden="true"
          ></i>
          <input
            type="text"
            placeholder="Search location"
            className="border border-gray-300 rounded-full p-4 pl-16 flex-1 focus:outline-none focus:ring-2 focus:grey-600"
          />
        </div>
      </div>

      {/* Static Map Image */}
      <div className="relative w-full h-[300px] bg-gray-200">
        <Image
          src="/maps.jpg"
          alt="Map Placeholder"
          width={430}
          height={300}
          className="w-full h-[300px] rounded-b-3xl object-cover"
        />
      </div>

      {/* Draggable Scooter List */}
      <div
        className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-lg p-6"
        style={{
          transform: `translateY(${dragPosition}px)`,
          transition: isDragging.current ? "none" : "transform 0.3s ease-out",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        <div className="bg-[#A3A3A3] h-1 w-20 rounded-full mx-auto mb-6"/>

        {/* Header */}
        <div className="flex items-start mb-4">
          <h2 className="text-xl font-bold mb-4 mr-auto">Nearby Scooter</h2>
          <div className="flex items-center">
            <Image
              src="/pinpoint.svg"
              alt="Pinpoint"
              width={15}
              height={15}
              className="object-contain"
            />
            <p className="ml-2 font-medium text-[#A3A3A3] text-base">
              Kiara Artha
            </p>
          </div>
        </div>

        {/* Scooter Cards */}
        <ScooterCard
          name="Scooter Type A"
          distance={5}
          battery={80}
          range={50}
        />
        <ScooterCard
          name="Scooter Type B"
          distance={10}
          battery={90}
          range={70}
        />
        <ScooterCard
          name="Scooter Type C"
          distance={8}
          battery={70}
          range={40}
        />
      </div>
    </main>
  );
}
