"use client";

import { useState, useEffect } from "react";
import { getSession, signOut } from "next-auth/react";
import BackButton from "@/components/BackButtons";
import Navbar from "@/components/NavBar";

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Password visibility states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Fetch current session data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await getSession();
        if (session?.user) {
          setFormData({
            fullName: session.user.full_name || "",
            email: session.user.email || "",
            oldPassword: "",
            newPassword: "",
          });
        }
      } catch {
        setError("Failed to fetch user session.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  // Handle form submission
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile. Check your old password.");
      }

      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-white relative mb-32">
      {/* Header */}
      <div className="relative flex items-center justify-center p-12">
        <h1 className="text-2xl font-extrabold text-gray-800 text-center flex-1">
          Edit Profile
        </h1>
      </div>

      {/* Profile Picture Placeholder */}
      <div className="flex justify-center">
        <div className="flex items-center justify-center w-[120px] h-[120px] bg-gray-300 rounded-full">
          <span className="text-5xl font-bold text-gray-800">
            {formData.fullName ? formData.fullName[0].toUpperCase() : "U"}
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center mt-6 text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && <p className="text-green-500 text-center mt-4">{success}</p>}

          {/* Form */}
          <div className="flex flex-col px-6 mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter email"
                disabled
              />
            </div>

            {/* Old Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Old Password</label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Enter old password"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  <i className={`fa ${showOldPassword ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  <i className={`fa ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row mt-20 px-6 gap-6">            
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full p-3 bg-[#282847] text-white font-semibold rounded-md"
            >
              Log Out
            </button>
            <button
              onClick={handleSave}
              className="w-full p-3 bg-[#F45E5E] text-white font-semibold rounded-md"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </>
      )}

      {/* Navbar */}
      <Navbar />
    </div>
  );
}
