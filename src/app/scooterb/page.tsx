import BackButton from "@/components/BackButtons";
import Navbar from "@/components/NavBar";
import Image from "next/image";

export default function ScooterPage() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-white relative">
      {/* Header */}
      <div className="relative flex items-center justify-center p-20">
        <BackButton />
        <h1 className="text-2xl font-extrabold text-gray-800 text-center items-center justify-center flex-1">
          Scooter Type B
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
            <div className="absolute bottom-0 h-1/2 bg-red-500 w-full rounded-full"></div>
          </div>
          <p className="mt-2 text-gray-800 font-semibold text-[24px] font-poppins">50</p>
          <p className="text-gray-500 text-[16px] font-medium font-poppins">Battery %</p>
        </div>
      </div>

      {/* Rent Button */}
      <div className="flex items-center justify-center gap-4 mt-12">
        {/* Range */}
        <div className="bg-white rounded-lg shadow-md p-4 w-[124px] h-[74px] flex flex-col px-6">
            <p className="text-gray-400 text-[9px] font-medium font-poppins items-start">Range</p>
            <div className="flex items-end">
                <p className="text-gray-900 font-extrabold text-[34px] font-poppins leading-none">100</p>
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
