"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import BackButton from "@/components/BackButtons";

export default function TutorialPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vehicleType = searchParams.get("type"); // Get 'type' from query params
  const vehicleId = searchParams.get("id"); // Fetch the vehicle ID from query params

  const isBike = vehicleType === "bike";
  const [loading, setLoading] = useState(false);

  // Handle Rent Button Click
  const handleRent = async () => {
    if (!vehicleId) return; // Ensure vehicleId exists
    setLoading(true);

    try {
      const response = await fetch(`/api/vehicle/rent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicleId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update vehicle status");
      }

      // Redirect to /camera after success
      router.push(`/camera`);
    } catch (error) {
      console.error("Error renting vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

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
          {isBike ? "How to Use Bike" : "How to Use Scooter"}
        </h2>

        {/* Image */}
        <div className="flex justify-center py-8">
          <Image
            src={isBike ? "/bike.webp" : "/scooter.webp"}
            alt={isBike ? "Bike" : "Scooter"}
            width={260}
            height={200}
            className="object-contain rounded-lg"
          />
        </div>

        {/* Instructions */}
        <div className="flex flex-col w-full max-w-sm py-6">
          {isBike ? (
            <ol className="list-decimal list-inside text-gray-600 text-sm leading-relaxed space-y-4">
              <li>Scan QR code on the handlebar to unlock the e-bike.</li>
              <li>Check brakes and wear a helmet before riding.</li>
              <li>Fold the kickstand up and pedal for acceleration.</li>
              <li>Stop pedaling or pull the brake levers to stop.</li>
              <li>Place the bike on its kickstand before ending the trip.</li>
            </ol>
          ) : (
            <ol className="list-decimal list-inside text-gray-600 text-sm leading-relaxed space-y-4">
              <li>Scan QR code on handlebar to unlock the e-scooter.</li>
              <li>Check equipment and wear a helmet before you ride.</li>
              <li>Push off to fold the kickstand and press the 'Go' button.</li>
              <li>Release 'Go' button gently or pull the brakes to stop.</li>
              <li>Place the scooter back on its kickstand to end the trip.</li>
            </ol>
          )}
        </div>
      </div>

      {/* Rent Button */}
      <div className="flex items-center justify-center mt-12">
        <button
          onClick={handleRent}
          disabled={loading}
          className={`${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
          } bg-red-500 text-white font-semibold text-[20px] w-[200px] h-[60px] rounded-[8px] transition`}
        >
          {loading ? "Processing..." : "Rent Now"}
        </button>
      </div>
    </div>
  );
}
