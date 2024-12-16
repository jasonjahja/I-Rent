// pages/RentPage.tsx
import { useState } from 'react';

const RentPage = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleEndNowClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleConfirmEnd = () => {
        // Lakukan aksi untuk mengakhiri penyewaan, misal redirect, API call, dll.
        console.log("Rent ended");
        setShowPopup(false);
    };

    return (
        <div className="min-h-screen bg-white relative flex flex-col items-center justify-center p-4 font-plus-jakarta-sans">
            {/* Konten utama */}
            <h1 className="text-3xl font-bold text-[#333] mb-8 text-center">
                Your Rent Starts Now!
            </h1>
            <div className="flex items-center justify-center gap-2 mb-8">
                <div className="w-16 h-16 flex items-center justify-center rounded-md bg-gradient-to-b from-[#F45E5E] to-[#F87575] text-white text-xl font-bold">
                    22
                </div>
                <span className="text-2xl font-bold text-[#333]">:</span>
                <div className="w-16 h-16 flex items-center justify-center rounded-md bg-gradient-to-b from-[#F45E5E] to-[#F87575] text-white text-xl font-bold">
                    22
                </div>
            </div>
            <div className="flex flex-col items-center gap-2 mb-8">
                <div className="flex items-center gap-2">
                    <div className="px-4 py-1 bg-[#F45E5E] bg-opacity-90 text-white text-sm rounded-md">
                        Date
                    </div>
                    <div className="w-32 h-3 bg-[#F45E5E] bg-opacity-30 rounded-full"></div>
                </div>
            </div>
            <button
                onClick={handleEndNowClick}
                className="px-6 py-2 bg-[#F45E5E] hover:bg-[#F87575] text-white font-bold rounded-md"
            >
                End Now!
            </button>

            {/* Pop-Up Modal */}
            {showPopup && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-64 text-center relative flex flex-col items-center">
                        {/* Icon peringatan - bisa pakai emoji atau SVG */}
                        <div className="mb-4">
                            <span className="text-red-500 text-4xl">⚠️</span>
                        </div>
                        <p className="mb-4 text-[#333] font-semibold">
                            Are you sure you want to end your rent now?
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={handleClosePopup}
                                className="px-4 py-2 bg-[#F45E5E] text-white rounded-md font-bold"
                            >
                                No
                            </button>
                            <button
                                onClick={handleConfirmEnd}
                                className="px-4 py-2 bg-green-500 text-white rounded-md font-bold"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RentPage;
