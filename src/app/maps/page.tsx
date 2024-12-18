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
  vehicle_type: string;
  position: string; // Position of the vehicle
  range: number;

}

export default function MapsPage() {
  const [dragPosition, setDragPosition] = useState(0);
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [clickedPoint, setClickedPoint] = useState<string | null>(null);
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

  // Touch event handlers for draggable list
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

  // Handle map point click
  const handlePointClick = (place: string) => {
    setSelectedPosition(place);
    setClickedPoint(place);
    setTimeout(() => setClickedPoint(null), 1500); // Reset pulsating effect after 1.5s
  };

  // Filter vehicles based on selected position; default shows all vehicles
  const filteredVehicles = selectedPosition
    ? vehicleData.filter((vehicle) => vehicle.position === selectedPosition)
    : vehicleData;

  return (
    <main className="w-full max-w-[430px] h-[932px] mx-auto bg-gray-100 flex flex-col items-center overflow-hidden">
      {/* Top Bar */}
      <div className="absolute z-10 flex items-center w-full p-4 mt-2 mr-4">
        <i className="fa fa-search relative left-10 text-gray-500"></i>
        <input
          type="text"
          placeholder="Search location"
          className="border border-gray-300 rounded-full p-4 pl-16 flex-1 focus:outline-none focus:ring-2 focus:grey-600"
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

        {/* Clickable Points with Animation */}
        {[
          { name: "Downtown", top: "25%", left: "14%" },
          { name: "Avenue", top: "30%", left: "64%" },
          { name: "Townsquare", bottom: "53.5%", right: "46%" },
          { name: "Metrohall", top: "27%", right: "-1.5%" },
        ].map((point) => (
          <div key={point.name}>
            {/* Circle Point */}
            <div
              onClick={() => handlePointClick(point.name)}
              className={`absolute w-10 h-10 rounded-full cursor-pointer ${
                clickedPoint === point.name ? "animate-pulse" : ""
              }`}
              style={{
                top: point.top,
                left: point.left,
                bottom: point.bottom,
                right: point.right,
              }}
            >
              {/* Click Effect - Icon */}
              {selectedPosition === point.name && (
                <div className="absolute -top-10 -left-8 flex flex-col items-center animate-fadeIn">
                  <span className="bg-white shadow-lg px-2 py-1 rounded-md text-sm font-semibold text-gray-700">
                    {point.name}
                  </span>
                  <div className="w-5 h-5 bg-red-500 rounded-full border-4 border-white shadow-md"></div>
                </div>
              )}
            </div>
          </div>
        ))}
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
          <h2 className="text-xl font-bold mr-auto">Choose A Vehicle</h2>
          <div className="flex items-center">
            <Image
              src="/pinpoint.svg"
              alt="Pinpoint"
              width={15}
              height={15}
              className="object-contain"
            />
            <p className="ml-2 font-medium text-[#A3A3A3] text-base">
              {selectedPosition || "All Locations"}
            </p>
          </div>
        </div>

        {/* Vehicle Cards */}
        {filteredVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-4 mb-8">
            <Image
              src="/no-vehicles.svg"
              alt="No Vehicles"
              width={120}
              height={120}
              className="mb-8"
            />
            <p className="text-gray-500 text-xl font-semibold">
              No vehicles available.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Please check back later or try refreshing the page.
            </p>
          </div>
        ) : (
          filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.vehicle_id}
              vehicleId={vehicle.vehicle_id}
              name={vehicle.vehicle_name}
              distance={vehicle.distance || 0}
              battery={vehicle.battery_level}
              range={vehicle.range}
              vehicleType={vehicle.vehicle_type}
            />
          ))
        )}
      </div>

      {/* Bottom Navbar */}
      <Navbar />
    </main>
  );
}
