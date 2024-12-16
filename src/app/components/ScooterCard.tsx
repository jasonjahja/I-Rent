import Image from "next/image";
import React from "react";

interface ScooterCardProps {
  name: string;
  distance: number;
  battery: number;
  range: number;
}

const ScooterCard: React.FC<ScooterCardProps> = ({
  name,
  distance,
  battery,
  range,
}) => {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <Image
          src="/bike1.svg"
          alt="Bike1"
          width={80}
          height={160}
          className="object-contain"
        />

        {/* Details */}
        <div className="ml-8">
          <h3 className="font-bold text-xl text-[#282847]">{name}</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">{distance} Meters Away</p>

          {/* Battery and Range */}
          <div className="flex gap-4">
            {/* Battery */}
            <div className="flex items-center">
              <Image
                src="/battery.svg"
                alt="Battery"
                width={30}
                height={30}
                className="object-contain"
              />
              <div className="ml-2">
                <p className="text-sm text-gray-600">Battery:</p>
                <span className="text-base text-[#282847] font-bold">{battery}</span><span className="text-sm text-[#282847] ml-1">%</span>
              </div>
            </div>

            {/* Range */}
            <div className="flex items-center">
              <Image
                src="/range.svg"
                alt="Range"
                width={30}
                height={30}
                className="object-contain"
              />
              <div className="ml-2">
                <p className="text-sm text-gray-600">Range:</p>
                <span className="text-base text-[#282847] font-bold">{range}</span><span className="text-sm text-[#282847] ml-1">km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rent Button */}
      {/* <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-bold">
        Rent
      </button> */}
    </div>
  );
};

export default ScooterCard;
