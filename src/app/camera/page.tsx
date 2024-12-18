"use client";

import React, { useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButtons";

export default function CameraPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const router = useRouter();

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const result = detectedCodes[0].rawValue; // Extract the raw value of the first detected barcode
      setScanResult(result);
      alert(`QR Code Scanned: ${result}`);
      router.push(`/rent`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="relative flex items-center justify-center pt-12 px-4">
        <BackButton />
        <h1 className="text-2xl font-bold text-gray-800 text-center flex-1">
          Scan QR Code
        </h1>
      </div>

      {/* QR Scanner */}
      <div className="flex flex-col items-center justify-center flex-1 px-8">
        <div className="w-full max-w-md h-max bg-gray-300 rounded-lg overflow-hidden shadow-lg">
          <Scanner
            onScan={handleScan}
            onError={(error) => console.error("Scan Error:", error)}
          />
        </div>

        {/* Scanned Data */}
        {scanResult && (
          <p className="mt-6 text-green-500 font-semibold text-lg">
            Scanned: {scanResult}
          </p>
        )}

        <p className="mt-6 text-gray-500 text-center">
          Align the QR code within the frame to scan.
        </p>
      </div>
    </div>
  );
}
