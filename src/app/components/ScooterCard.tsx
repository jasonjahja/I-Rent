import React from "react";

interface ScooterCardProps {
  name: string;
  distance: string;
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
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
          🛴
        </div>
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm text-gray-500">{distance} Away</p>
          <div className="flex gap-2 mt-1">
            <p className="text-sm text-green-600 font-bold">Battery: {battery}%</p>
            <p className="text-sm text-blue-600 font-bold">Range: {range} km</p>
          </div>
        </div>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
        Rent
      </button>
    </div>
  );
};

export default ScooterCard;
