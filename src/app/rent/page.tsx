"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RentPage() {
    const [showPopup, setShowPopup] = useState(false);
    const [time, setTime] = useState(0); // Time in seconds
    const [isRunning, setIsRunning] = useState(true); // Control stopwatch
    const [startDate, setStartDate] = useState(null); // State untuk menyimpan tanggal mulai

    const router = useRouter();

    useEffect(() => {
        // Set tanggal mulai saat komponen pertama kali mount
        setStartDate(new Date());
    }, []);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isRunning]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (time % 60).toString().padStart(2, "0");
        return { minutes, seconds };
    };

    const handleEndNowClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleConfirmEnd = () => {
        setIsRunning(false);
        console.log("Rent ended. Total time:", time);
        setShowPopup(false);
        router.push("/home");
    };

    // Format date menjadi hari dan tanggal, misalnya "Tuesday, Dec 17, 2024"
    const formattedStartDate = startDate
        ? startDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : "";

    const { minutes, seconds } = formatTime(time);

    return (
        <div className="h-screen flex flex-col items-center justify-center p-4 font-plus-jakarta-sans relative bg-white">
            {/* Heading */}
            <h1 className="text-4xl font-bold text-[#333] mb-8 text-center leading-tight">
                Your Rent<br />Starts Now!
            </h1>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 mb-12">
                <div className="w-32 h-32 flex items-center justify-center rounded-md bg-gradient-to-b from-[#F45E5E] to-[#F87575] text-white text-6xl font-bold">
                    {minutes}
                </div>
                <span className="text-6xl font-bold text-[#333]">:</span>
                <div className="w-32 h-32 flex items-center justify-center rounded-md bg-gradient-to-b from-[#F45E5E] to-[#F87575] text-white text-6xl font-bold">
                    {seconds}
                </div>
            </div>

            {/* Date Button and Input Field */}
            <div className="flex items-center gap-2 mb-8">
                <button className="px-4 py-2 bg-[#F45E5E] text-white rounded-md font-bold">
                    Date
                </button>
                <input
                    type="text"
                    className="w-56 px-4 py-2 rounded-md border border-[#F45E5E] focus:outline-none focus:border-[#F87575]"
                    value={formattedStartDate}
                    readOnly
                />
            </div>

            {/* End Now Button at the Bottom */}
            <div className="w-full flex justify-center absolute bottom-8">
                <button
                    onClick={handleEndNowClick}
                    className="px-6 py-2 bg-[#F45E5E] hover:bg-[#F87575] text-white font-bold rounded-md"
                >
                    End Now!
                </button>
            </div>

            {/* Pop-Up Modal */}
            {showPopup && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-64 text-center relative flex flex-col items-center">
                        {/* Warning Icon */}
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
}
