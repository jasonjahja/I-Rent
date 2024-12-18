"use client";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

interface User {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
}

interface Vehicle {
  vehicle_id: number;
  vehicle_name: string;
  vehicle_type: string;
  latitude: number;
  longitude: number;
  status: string;
  battery_level: number;
}

interface Rental {
  rental_id: number;
  id: number; // User ID
  vehicle_id: number;
  start_time: string;
  end_time: string;
  total_cost: number;
  status: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/data");
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setUsers(data.users);
        setVehicles(data.vehicles);
        setRentals(data.rentals);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const fetchSession = async () => {
      const currentSession = await getSession(); // Get the current session
      setSession(currentSession); // Set it to state
    };

    fetchSession();
    fetchData();
  }, []);

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
        Admin Dashboard
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display Current Logged-In User */}
      {session ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-lg p-4 sm:p-6 mt-4 mb-6">
          <h2 className="text-lg sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">
            Current Logged-In User
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gray-300 text-gray-700 rounded-full h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center text-xl sm:text-2xl font-bold">
              {session.user.full_name
                ? session.user.full_name[0].toUpperCase()
                : "U"}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800">
                {session.user.full_name || "N/A"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Logged in as:{" "}
                <span className="font-medium">{session.user.email}</span>
              </p>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center">
              <p className="text-gray-600 font-medium text-sm sm:text-base">
                Email:
              </p>
              <p className="ml-2 sm:ml-4 text-gray-800 text-sm sm:text-base">
                {session.user.email}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 font-medium text-sm sm:text-base">
                Name:
              </p>
              <p className="ml-2 sm:ml-4 text-gray-800 text-sm sm:text-base">
                {session.user.full_name || "N/A"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-4">
          <p className="text-red-500 font-semibold text-base sm:text-lg">
            No user is currently logged in.
          </p>
        </div>
      )}

      {/* Users Table */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-2xl font-semibold mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-2 sm:px-4 py-2">ID</th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">Name</th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">Email</th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">{user.id}</td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {user.full_name}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Vehicles Table */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-2xl font-semibold mb-4">Vehicles</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 sm:px-4 py-2">ID</th>
                <th className="border px-2 sm:px-4 py-2">Name</th>
                <th className="border px-2 sm:px-4 py-2">Type</th>
                <th className="border px-2 sm:px-4 py-2">Battery</th>
                <th className="border px-2 sm:px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.vehicle_id}>
                  <td className="border px-2 sm:px-4 py-2">{vehicle.vehicle_id}</td>
                  <td className="border px-2 sm:px-4 py-2">{vehicle.vehicle_name}</td>
                  <td className="border px-2 sm:px-4 py-2">{vehicle.vehicle_type}</td>
                  <td className="border px-2 sm:px-4 py-2">{vehicle.battery_level}%</td>
                  <td className="border px-2 sm:px-4 py-2">{vehicle.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rentals Table */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-2xl font-semibold mb-4">Rentals</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 sm:px-4 py-2">Rental ID</th>
                <th className="border px-2 sm:px-4 py-2">User ID</th>
                <th className="border px-2 sm:px-4 py-2">Vehicle ID</th>
                <th className="border px-2 sm:px-4 py-2">Start Time</th>
                <th className="border px-2 sm:px-4 py-2">End Time</th>
                <th className="border px-2 sm:px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental) => (
                <tr key={rental.rental_id}>
                  <td className="border px-2 sm:px-4 py-2">{rental.rental_id}</td>
                  <td className="border px-2 sm:px-4 py-2">{rental.id}</td>
                  <td className="border px-2 sm:px-4 py-2">{rental.vehicle_id}</td>
                  <td className="border px-2 sm:px-4 py-2">
                    {new Date(rental.start_time).toLocaleString()}
                  </td>
                  <td className="border px-2 sm:px-4 py-2">
                    {new Date(rental.end_time).toLocaleString()}
                  </td>
                  <td className="border px-2 sm:px-4 py-2">{rental.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
