import BackButton from "@/components/BackButtons";
import Image from "next/image";

export default function ScooterPage2() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-white relative">
      {/* Header */}
      <div className="relative flex items-center justify-center p-20">
        <BackButton />
        <h1 className="text-2xl font-extrabold text-gray-800 text-center items-center justify-center flex-1">
          Scooter Type A
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex justify-between items-center px-6 mt-[60px]">
        {/* Scooter Image */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/scooterb.png"
            alt="Scooter"
            width={250}
            height={250}
            className="h-full object-contain"
          />
        </div>

        {/* Battery Bar */}
        <div className="flex flex-col items-center ml-6">
          <div className="relative h-[250px] w-[20px] bg-red-100 rounded-full overflow-hidden">
            <div className="absolute bottom-0 h-1/2 bg-red-500 w-full"></div>
          </div>
          <p className="mt-2 text-gray-800 font-bold text-xl">50</p>
          <p className="text-gray-500 text-sm">Battery %</p>
        </div>
      </div>

      {/* Rent Button */}
      <div className="flex items-center justify-center gap-4 mt-20">
        {/* Range */}
        <div className="bg-white rounded-lg shadow-md p-4 w-[124px] h-[74px] flex flex-col px-6">
            <p className="text-gray-400 text-[9px] font-medium font-poppins items-start">Range</p>
            <div className="flex items-end">
                <p className="text-gray-900 font-extrabold text-[34px] font-poppins leading-none">100</p>
                <p className="text-gray-400 text-[10px] font-medium font-poppins">km</p>
            </div>
        </div>

        {/* Rent Button */}
        <button className="bg-red-500 text-white font-semibold w-[200px] h-[74px] rounded-[8px] hover:bg-red-600 transition">
          Rent
        </button>
      </div>
      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 w-full bg-white shadow-inner flex justify-around items-center py-4">
        <div className="flex flex-col items-center text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9l9-7 9 7v12a2 2 0 01-2 2h-3a2 2 0 01-2-2v-5H9v5a2 2 0 01-2 2H4a2 2 0 01-2-2V9z" />
          </svg>
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-18a8 8 0 110 16 8 8 0 010-16z" />
          </svg>
          <span className="text-xs">Map</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 3.582-8 8h2a6 6 0 0112 0h2c0-4.418-3.582-8-8-8z" />
          </svg>
          <span className="text-xs">Profile</span>
        </div>
      </div>
    </div>
  );
}
