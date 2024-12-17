"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false); // Loading state for UX feedback
  const router = useRouter();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: undefined }); // Clear specific field error
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    setLoading(true); // Start loading state

    // Validation for empty fields
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email/Phone Number is required." }));
      setLoading(false);
      return;
    }
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      setLoading(false);
      return;
    }

    try {
      // Call NextAuth signIn
      const result = await signIn("credentials", {
        email: formData.email, // Pass correct "email" key
        password: formData.password,
        redirect: false, // Prevent redirect for manual error handling
      });

      if (result?.error) {
        setErrors({ general: "Invalid email/phone number or password." });
      } else {
        // On successful login, redirect to the home page
        router.push("/maps");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrors({ general: "Something went wrong. Please try again later." });
    } finally {
      setLoading(false); // Stop loading state
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
            {/* Email Field */}
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xl font-medium text-gray-700">Password</label>
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading} // Disable button during loading
              className={`bg-red-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200 mt-4 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
              }`}
            >
              {loading ? "Logging In..." : "Log In"}
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
