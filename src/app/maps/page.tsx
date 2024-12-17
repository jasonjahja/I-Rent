"use client";
import React, { useState, useRef, useEffect } from "react";
import VehicleCard from "../../components/VehicleCard";
import Navbar from "../../components/NavBar";
import Image from "next/image";

interface Vehicle {
  vehicle_id: number;
  vehicle_name: string;
  distance?: number;
  battery_level: number;
  vehicle_type: string; // "scooter" or "bike"
}

export default function MapsPage() {
  const [dragPosition, setDragPosition] = useState(0);
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // Fetch vehicle data dynamically
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch("/api/vehicle");
        if (!response.ok) throw new Error("Failed to fetch vehicles");

        const data = await response.json();
        setVehicleData(data.vehicles);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };
    fetchVehicle();
  }, []);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startY.current = e.touches[0].clientY - currentY.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;

    const yPos = e.touches[0].clientY - startY.current;
    if (yPos >= 0 && yPos <= 600) {
      currentY.current = yPos;
      setDragPosition(yPos);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    if (currentY.current > 300) {
      setDragPosition(220);
      currentY.current = 220;
    } else {
      setDragPosition(-100);
      currentY.current = -100;
    }
  };

  return (
    <main className="w-full max-w-[430px] h-[932px] mx-auto bg-gray-100 flex flex-col items-center overflow-hidden">
      {/* Top Bar */}
      <div className="absolute z-10 flex items-center w-full p-4 mt-2 mr-4">
        <i
          className="fa fa-search relative left-10 text-gray-500"
          aria-hidden="true"
        ></i>
        <input
          type="text"
          placeholder="Search location"
          className="border border-gray-300 rounded-full p-4 pl-16 flex-1 focus:outline-none focus:ring-2 focus:grey-600 "
        />
      </div>

      {/* Static Map Image */}
      <div className="relative w-full h-full bg-gray-200">
        <Image
          src="/maps.jpg"
          alt="Map Placeholder"
          layout="fill"
          priority
          className="rounded-b-3xl object-cover"
        />
      </div>

      {/* Draggable Vehicle List */}
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
        <div className="bg-[#A3A3A3] h-1 w-20 rounded-full mx-auto mb-6" />

        {/* Header */}
        <div className="flex items-start mb-4">
          <h2 className="text-xl font-bold mr-auto">Nearby Vehicles</h2>
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

        {/* Content when No Vehicles */}
        {vehicleData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Image
              src="/no-vehicles.webp"
              alt="No Vehicles"
              width={120}
              height={120}
              className="mb-4"
            />
            <p className="text-gray-500 text-xl font-semibold">
              No vehicles are currently available.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Please check back later or try refreshing the page.
            </p>
          </div>
        ) : (
          // Dynamic Vehicle Cards
          vehicleData.map((vehicle) => (
            <VehicleCard
              key={vehicle.vehicle_id}
              vehicleId={vehicle.vehicle_id}
              name={vehicle.vehicle_name}
              distance={vehicle.distance || 0}
              battery={vehicle.battery_level}
              range={50} // Example static range; update dynamically if applicable
              vehicleType={vehicle.vehicle_type}
            />
          ))
        )}
      </div>

      <Navbar />
    </main>
  );
}
