"use client"
import React from 'react';
import Image from 'next/image';

export default function Tutorial() {
  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen">
      {/* Container untuk Simulasi iPhone 14 Pro Max */}
      <div className="bg-gray-50 w-[430px] h-[932px] flex flex-col items-center p-4 font-sans shadow-lg border rounded-xl">
        {/* Header */}
        <header className="w-full flex justify-between items-center text-gray-400 text-sm mb-4 px-4">
          <p className="text-gray-500">Tutorial Scooter A</p>
          <span className="text-black font-bold">9:41</span>
        </header>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Tutorial</h1>

          {/* Image */}
          <div className="flex justify-center my-6">
            <Image
              src="/scootera.png"
              alt="Scooter"
              width={300}
              height={200}
              className="rounded"
            />
          </div>

          {/* Instructions */}
          <ol className="list-decimal list-inside text-gray-600 text-sm leading-relaxed">
            <li>Scan QR code on handlebar to unlock the e-scooter.</li>
            <li>Check all equipment, including the brakes, and wear a helmet before you ride.</li>
            <li>
              Push off on the e-scooter to fold the kickstand up and get it moving, then press the
              ‘Go’ button found on the handlebar gently.
            </li>
            <li>
              Release ‘Go’ button gently to reduce your speed or pull firmly on the brake levers on
              the handlebar.
            </li>
            <li>Place the vehicle back on its kickstand before ending the trip.</li>
          </ol>

          {/* Button */}
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 w-full rounded-lg mt-6">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}
