import Link from 'next/link';
import Image from 'next/image';

export default function Home () {
    return (
        <div className="relative w-full min-h-screen bg-[#F45E5E] flex flex-col justify-center items-center p-4 font-plus-jakarta-sans">
            <div className="max-w-sm w-full text-white flex flex-col gap-4">
                <h1 className="text-3xl font-bold leading-snug">
                    Find the nearest scooter to you in just a few taps.
                </h1>
                <div>
                    <Link href="/login">
                        <button className="mt-4 w-fit px-4 py-2 bg-white text-[#F45E5E] font-bold rounded-lg text-lg">
                            Rent Now!
                        </button>
                    </Link>
                </div>
            </div>

            <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-4">
                <div className="relative w-[150px] md:w-[250px] h-auto">
                    <Image
                        src="/scooter.svg"
                        alt="Scooter"
                        width={250}
                        height={500}
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
};
