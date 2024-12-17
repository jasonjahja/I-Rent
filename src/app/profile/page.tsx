import BackButton from "@/components/BackButtons";
import Navbar from "@/components/NavBar";
import Image from "next/image";

export default function EditProfilePage() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-white relative">
      {/* Header */}
      <div className="relative flex items-center justify-center p-16">
        <BackButton />
        <h1 className="text-2xl font-extrabold text-gray-800 text-center flex-1">
          Edit Profile
        </h1>
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center">
        <div className="flex items-center justify-center">
          <Image
            src="/avatar.png"
            alt="Profile Avatar"
            width={120}
            height={120}
            className="object-cover"
          />
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col px-6 mt-6 space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter email"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="text"
            className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter phone number"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter password"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col mt-8 px-6 space-y-4">
        <button className="w-full p-3 bg-[#29844c] text-white font-semibold rounded-md hover:bg-green-700 transition">
          Save Changes
        </button>
        <button className="w-full p-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition">
          Log Out
        </button>
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
}
