export default function Home() {
  return (
    <div className="bg-[#FFECEC] h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-12 py-5">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-black font-bold text-xl">
          <img src="/logo.png" alt="Logo" className="h-20" />
        </div>
        {/* Google Play Button */}
      </header>


      {/* Main Content */}
      <main className="flex-grow grid grid-cols-3 items-center text-center">
        {/* Kiri: Teks */}
        <div className="hidden md:block text-black text-[55px] font-bold -translate-y-10 translate-x-10">
          <p>Unlock Your Ride, Unleash the Fun.</p>
        </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center flex-grow">
        {/* HP dengan isi gambar */}
        <img
          src="/bike.png"
          alt="Phone Mockup with Content"
          className="w-80 h-[480px] object-contain -translate-y-3"
        />
        {/* Tombol di bawah gambar dan posisinya di tengah */}
        <button className="bg-red-500 text-white px-16 py-3 rounded-[50px] font-bold hover:bg-red-600 transition duration-300">
          Mobile Version 
        </button>
    </div>

        {/* Kanan: Teks */}
        <div className="hidden md:block text-black text-[30px] font-semibold -translate-y-10 -translate-x-10">
          <p>"Hope on a scooter and explore the beauty of your destination like never before."</p>
        </div>
      </main>
    </div>
  );
}
