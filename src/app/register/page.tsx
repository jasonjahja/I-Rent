"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState<{
    full_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility for Password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle visibility for Confirm Password
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true); // Prevent hydration mismatch
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Client-side validation
    if (formData.password !== formData.confirm_password) {
      setErrors({ confirm_password: "Passwords do not match." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error.includes("email")) {
          setErrors({ email: result.error });
        } else {
          setErrors({ general: result.error });
        }
        return;
      }

      router.push("/home");
    } catch {
      setErrors({ general: "Something went wrong. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  if (!hydrated) return null;

  return (
    <div className="flex bg-red-500 justify-center overflow-hidden">
      <div className="shadow-lg w-full">
        {/* Header */}
        <div className="text-white text-center py-12 flex items-center justify-center">
          <Image src="/Irent.png" alt="Logo" width={180} height={45} />
        </div>

        {/* Form */}
        <div className="p-8 rounded-t-[38px] bg-white">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            Create New Account
          </h2>

          {/* General Error */}
          {errors.general && (
            <p className="text-red-500 text-sm text-center mb-4">{errors.general}</p>
          )}

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Full Name */}
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
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                required
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="************"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  aria-label="Toggle Password Visibility"
                >
                  <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="************"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  aria-label="Toggle Confirm Password Visibility"
                >
                  <i
                    className={`fa ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  />
                </button>
              </div>
              {errors.confirm_password && (
                <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`bg-red-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-red-500 font-semibold hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
