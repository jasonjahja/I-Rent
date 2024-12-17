"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: "", // Accepts email or phone number
    password: "",
  });

  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
    general?: string;
  }>({});

  const router = useRouter();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the field-specific error when user types
    setErrors({ ...errors, [name]: undefined });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Check if the API returned field-specific errors
        if (result.errors) {
          setErrors(result.errors);
        } else {
          throw new Error(result.error || "Invalid login credentials.");
        }
        return;
      }

      // Redirect to dashboard or home page on success
      router.push("/dashboard");
    } catch (err) {
      setErrors({ general: (err as Error).message });
    }
  };

  return (
    <div className="flex bg-red-500 min-h-screen overflow-hidden justify-center">
      <div className="shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="text-white text-center py-12">
          <div className="flex items-center justify-center">
            <Image
              src="/Irent.png"
              alt="Logo"
              width={180}
              height={45}
              className="items-center justify-center"
            />
          </div>
        </div>

        {/* Form */}
        <div className="p-8 rounded-t-[38px] bg-white h-full">
          <h2 className="text-3xl font-Poppins font-bold text-center mb-8 text-black mt-2">
            Log In to Your <br /> Account
          </h2>

          {/* General Error */}
          {errors.general && (
            <p className="text-red-500 text-sm text-center mb-4">{errors.general}</p>
          )}

          <form className="flex flex-col gap-6 font-poppins" onSubmit={handleSubmit}>
            {/* Identifier Field */}
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Email/Phone Number
              </label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Your Email/Phone Number"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
              {errors.identifier && (
                <p className="text-red-500 text-xs mt-1">{errors.identifier}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 mt-4"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-red-500 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
