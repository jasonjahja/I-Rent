"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/components/BackButtons";
import Navbar from "@/components/NavBar";
import Image from "next/image";

interface Vehicle {
  vehicle_id: number;
  vehicle_name: string;
  battery_level: number;
  vehicle_type: string;
  range: number;
}

export default function VehiclePage() {
  const { id } = useParams(); // Fetch dynamic ID from the URL
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch vehicle details by ID
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`/api/vehicle/${id}`); // API to get specific vehicle
        if (!response.ok) throw new Error("Failed to fetch vehicle data.");

        const data = await response.json();
        setVehicle(data.vehicle);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) return <p className="text-center mt-8 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-white relative">
      {/* Header */}
      <div className="relative flex items-center justify-center p-20">
        <BackButton />
        <h1 className="text-2xl font-extrabold text-gray-800 text-center flex-1">
          {vehicle?.vehicle_name || "Vehicle"}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex justify-between items-center px-6 mt-[60px]">
        {/* Vehicle Image */}
        <div className="flex-1 flex justify-center">
          <Image
            src={vehicle?.vehicle_type === "bike" ? "/bike.png" : "/scootera.png"}
            alt={vehicle?.vehicle_name || "Vehicle"}
            width={250}
            height={250}
            className="h-full object-contain"
          />
        </div>

        {/* Battery Bar */}
        <div className="flex flex-col items-center ml-6">
          <div className="relative h-[250px] w-[20px] bg-red-100 rounded-full overflow-hidden">
            <div
              className="absolute bottom-0 bg-red-500 w-full rounded-full"
              style={{ height: `${vehicle?.battery_level || 0}%` }} // Dynamic battery level
            ></div>
          </div>
          <p className="mt-2 text-gray-800 font-semibold text-[24px] font-poppins">
            {vehicle?.battery_level || 0}
          </p>
          <p className="text-gray-500 text-[16px] font-medium font-poppins">Battery %</p>
        </div>
      </div>

      {/* Rent Button */}
      <div className="flex items-center justify-center gap-4 mt-12">
        {/* Range */}
        <div className="bg-white rounded-lg shadow-md p-4 w-[124px] h-[74px] flex flex-col px-6">
          <p className="text-gray-400 text-[9px] font-medium font-poppins items-start">Range</p>
          <div className="flex items-end">
            <p className="text-gray-900 font-extrabold text-[34px] font-poppins leading-none">
              {vehicle?.range || 0}
            </p>
            <p className="text-gray-400 text-[10px] font-medium font-poppins">km</p>
          </div>
        </div>

        {/* Rent Button */}
        <button className="bg-red-500 text-white font-semibold font-poppins text-[24px] w-[200px] h-[74px] rounded-[8px] hover:bg-red-600 transition">
          Rent
        </button>
      </div>

      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}
