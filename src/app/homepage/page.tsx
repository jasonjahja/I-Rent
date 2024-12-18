"use client";

import Image from "next/image";
import Navbar from "@/components/NavBar";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-6 py-4">
        <h1 className="text-3xl font-bold text-red-500">I–Rent</h1>
        <p className="text-xl font-semibold mt-4">Hi, Username!</p>
      </div>

      {/* Image and Overlay Text */}
      <div className="relative px-4 ">
        <div className="relative rounded-[10px] overflow-hidden shadow-md before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/70 before:to-transparent before:rounded-[10px]">
          <Image
            src="/scooter-home.png"
            alt="Scooter"
            width={370}
            height={225}
            className="object-cover w-full h-[225px]"
          />
        </div>

        {/* Overlay Text */}
        <div className="absolute bottom-0 left-0 w-full px-4 py-2">
          <p className="text-white text-[18px] font-extrabold leading-tight px-4 py-2">
            Zip through the city with I-Rent: 
            your eco-friendly electric scooter & bike ride!
          </p>
        </div>
      </div>

      {/* Why Us Section */}
      <div className="mt-6 px-4">
        <h2 className="text-xl font-bold text-red-500 mb-3">Why Us?</h2>

        <div className="space-y-4">
          {/* Card 1 */}
          <div className="bg-red-100 rounded-lg p-4 flex gap-4 items-center">
            <Image
              src="/fast1.svg"
              alt="Feature"
              width={50}
              height={50}
              className="rounded"
            />
            <div>
              <p className="font-bold">Fast and Easy Rentals</p>
              <p className="text-sm text-gray-600">
                Easy online process for renting electric scooters and bikes.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-red-100 rounded-lg p-4 flex gap-4 items-center">
            <Image
              src="/eco1.svg"
              alt="Feature"
              width={50}
              height={50}
              className="rounded"
            />
            <div>
              <p className="font-bold">Eco-Friendly and Convenient</p>
              <p className="text-sm text-gray-600">
                Offering sustainable and convenient transportation options for
                users.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-red-100 rounded-lg p-4 flex gap-4 items-center">
            <Image
              src="/track1.svg"
              alt="Feature"
              width={100}
              height={100}
              className="rounded"
            />
            <div>
              <p className="font-bold">Real-Time Tracking</p>
              <p className="text-sm text-gray-600">
                Monitor scooter and bike availability and location instantly for
                a hassle-free ride.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Find Us Button */}
      <div className="px-4 mt-6">
        <button
          onClick={() => router.push("/maps")}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Find Us!
        </button>
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
}
