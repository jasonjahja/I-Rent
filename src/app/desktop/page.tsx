import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#FFECEC] h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-12 py-5">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-black font-bold text-xl">
          <Image 
            src="/logo.webp" 
            alt="Logo" 
            width={100}
            height={80} 
            className="object-contain"
          />
        </div>
        {/* Google Play Button */}
        <Image 
          src="/google-play.webp" 
          alt="Google Play Button" 
          width={120}
          height={80} 
          className="object-contain"
        />
      </header>

      {/* Main Content */}
      <main className="items-center text-center -translate-y-10">
        {/* Left: Text */}
        <div className="hidden md:block text-[#F45E5E] text-5xl font-bold leading-normal mb-8">
          <p>Unlock Your Ride, Unleash the Fun.</p>
        </div>
        <p className="hidden md:block text-gray-500 text-2xl font-semibold leading-normal">
          "Hop on our vehicles and explore the beauty of your destination like
          never before."
        </p>

        {/* Center: Phone Mockup */}
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/mobile-view.png"
            alt="Phone Mockup with Content"
            layout="intrinsic"
            width={980}
            height={480}
            className="object-contain translate-y-20"
          />
        </div>
      </main>
    </div>
  );
}
