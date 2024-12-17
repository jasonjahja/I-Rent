"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation"; // Import hooks from Next.js

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // Hook to get the current route

  // Function to check active status based on pathname
  const isActive = (page: string) => {
    switch (page) {
      case "home":
        return pathname === "/";
      case "map":
        return pathname === "/maps";
      case "profile":
        return pathname === "/profile";
      default:
        return false;
    }
  };

  // Handle navigation
  const handleNavigation = (page: string) => {
    switch (page) {
      case "home":
        router.push("/"); // Redirect to home page
        break;
      case "map":
        router.push("/maps"); // Redirect to map page
        break;
      case "profile":
        router.push("/profile"); // Redirect to profile page
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-gray-500 shadow-[0_-10px_10px_rgba(0,0,0,0.1)] flex justify-around items-center py-6">
      {/* Home */}
      <div
        onClick={() => handleNavigation("home")}
        className={`flex flex-col items-center cursor-pointer ${
          isActive("home") ? "text-red-500" : "text-gray-400"
        }`}
      >
        <Image
          src={isActive("home") ? "/home-active.svg" : "/home.svg"}
          alt="Home"
          width={32}
          height={32}
          priority
        />
        <span className="text-sm mt-2">Home</span>
      </div>

      {/* Map */}
      <div
        onClick={() => handleNavigation("map")}
        className={`flex flex-col items-center cursor-pointer ${
          isActive("map") ? "text-red-500" : "text-gray-400"
        }`}
      >
        <Image
          src={isActive("map") ? "/map-active.svg" : "/map.svg"}
          alt="Map"
          width={32}
          height={32}
          priority
        />
        <span className="text-sm mt-2">Map</span>
      </div>

      {/* Profile */}
      <div
        onClick={() => handleNavigation("profile")}
        className={`flex flex-col items-center cursor-pointer ${
          isActive("profile") ? "text-red-500" : "text-gray-400"
        }`}
      >
        <Image
          src={isActive("profile") ? "/profile-active.svg" : "/profile.svg"}
          alt="Profile"
          width={32}
          height={32}
          priority
        />
        <span className="text-sm mt-2">Profile</span>
      </div>
    </div>
  );
}
