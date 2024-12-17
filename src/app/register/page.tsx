"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    full_name?: string;
    email?: string;
    phone_number?: string;
    password?: string;
    general?: string;
  }>({});

  const router = useRouter();
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear field-specific error on change
    setErrors({ ...errors, [name]: undefined });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Assign field-specific errors if returned from the backend
        if (result.errors) {
          setErrors(result.errors);
        } else {
          throw new Error(result.error || "Failed to register user.");
        }
        return;
      }

      setSuccess("User registered successfully!");
      router.push("/");
      setFormData({ full_name: "", email: "", phone_number: "", password: "" });
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
          <h2 className="text-3xl font-Poppins font-bold text-center mb-8 text-black">
            Create New <br /> Account
          </h2>

          {errors.general && (
            <p className="text-red-500 text-sm text-center mb-4">{errors.general}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm text-center mb-4">{success}</p>
          )}

          <form
            className="flex flex-col gap-6 font-poppins"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
              )}
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="@johndoe@example.com"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="+1234567890 (max 15 digits, no spaces)"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
              {errors.phone_number && (
                <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>
              )}
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="************"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 mt-4"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-red-500 font-semibold hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
