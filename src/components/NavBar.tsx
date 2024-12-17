"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("home");

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-gray-500 shadow-[0_-10px_10px_rgba(0,0,0,0.1)] flex justify-around items-center py-6">
      {/* Home */}
      <div
        onClick={() => setActive("home")}
        className={`flex flex-col items-center ${
          active === "home" ? "text-red-500" : "text-gray-400"
        }`}
      >
        <Image
          src={active === "home" ? "/home-active.svg" : "/home.svg"}
          alt="Home"
          width={32}
          height={32}
        />
        <span className="text-sm mt-2">Home</span>
      </div>

      {/* Map */}
      <div
        onClick={() => setActive("map")}
        className={`flex flex-col items-center ${
          active === "map" ? "text-red-500" : "text-gray-400"
        }`}
      >
        <Image
          src={active === "map" ? "/map-active.svg" : "/map.svg"}
          alt="Map"
          width={32}
          height={32}
        />
        <span className="text-sm mt-2">Map</span>
      </div>

      {/* Profile */}
      <div
        onClick={() => setActive("profile")}
        className={`flex flex-col items-center ${
          active === "profile" ? "text-red-500" : "text-gray-400"
        }`}
      >
        <Image
          src={active === "profile" ? "/profile-active.svg" : "/profile.svg"}
          alt="Profile"
          width={32}
          height={32}
        />
        <span className="text-sm mt-2">Profile</span>
      </div>
    </div>
  );
}
