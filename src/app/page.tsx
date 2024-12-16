import React from "react";
import ScooterCard from "../app/components/ScooterCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-[430px] h-[932px] mx-auto bg-gray-100 flex flex-col items-center overflow-hidden">
      {/* Search Bar */}
      <div className="flex items-center w-full p-4 bg-white shadow-md">
        <button className="mr-4">←</button>
        <input
          type="text"
          placeholder="Search Location"
          className="w-full p-2 border rounded-full focus:outline-none"
        />
      </div>

      {/* Static Map Image */}
      <div className="relative w-full h-[300px] bg-gray-200">
        <Image
          src="/maps.jpg" // Replace with your image
          alt="Map Placeholder"
          layout="fill"
          objectFit="cover"
          className="rounded-b-3xl"
        />
      </div>

      {/* Scooter List */}
      <div className="w-full bg-white rounded-t-3xl p-6 shadow-lg flex-1 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Nearby Scooter</h2>
        <ScooterCard
          name="Scooter Type A"
          distance="5 Meters"
          battery={80}
          range={50}
        />
        <ScooterCard
          name="Scooter Type B"
          distance="10 Meters"
          battery={90}
          range={70}
        />
        <ScooterCard
          name="Scooter Type C"
          distance="8 Meters"
          battery={70}
          range={40}
        />
      </div>
    </div>
  );
}
