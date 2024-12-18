import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="relative w-full min-h-screen bg-[#F45E5E] flex flex-col justify-center items-center p-4 font-plus-jakarta-sans">

            {/* Background Image */}
            <div className="absolute right-0 top-0 bottom-0 z-0 ">
                <Image
                    src="/scooter.svg"
                    alt="Scooter"
                    width={300}
                    height={300}
                    layout="intrinsic"
                    className="opacity-75"
                />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 max-w-sm ml-10 w-full text-white flex flex-col gap-4">
                <h1 className="text-6xl font-bold leading-snug">
                    Find the nearest scooter to you in just a few taps.
                </h1>
                <div>
                    <Link href="/login">
                        <button className="mt-4 w-fit px-10 py-4 bg-white text-[#F45E5E] font-bold rounded-lg text-2xl">
                            Rent Now!
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
