import Image from 'next/image';

export default function DesktopPage() {
  return (
    <div className="relative w-screen h-screen">
      {/* Full-Page Background Image */}
      <Image
        src="/biker.png" // Background image
        alt="Person Riding Scooter"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
<div className="absolute bottom-16 left-36 md:left-64 lg:left-56 flex flex-col items-center">
  <button className="w-[200px] md:w-[240px] px-6 py-3 bg-[#F45E5E] text-white rounded-full text-lg font-bold shadow-lg hover:bg-[#e14b4b] transition-all">
    Mobile Version &rarr;
  </button>
</div>

      {/* Overlay Heading (Header di Atas) */}
      <div className="absolute top-8 left-0 w-full text-center text-red-500">
      <h1 className="text-4xl md:text-6xl font-bold text-[#F45E5E] drop-shadow-lg">
  Unlock Your Ride, Unleash the Fun!
</h1>

      </div>
    </div>
  );
}