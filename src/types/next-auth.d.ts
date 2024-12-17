import type { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  // Extend Session object
  interface Session extends DefaultSession {
    user: {
      user_id: number; // Prisma model has user_id as Int
      email: string; // Add email explicitly
      full_name: string; // Add full_name
      phone_number: string; // Add phone_number
    } & DefaultSession["user"];
  }

  // Extend User object
  interface User {
    user_id: number; // Match Prisma user_id as Int
    email: string; // Email is always present in your Prisma User model
    full_name: string; // Include full_name from Prisma model
    phone_number: string; // Include phone_number
  }
}

declare module "next-auth/jwt" {
  // Extend JWT object
  interface JWT extends DefaultJWT {
    user_id: number; // Include user_id in the JWT
    email: string; // Include email in the JWT
    full_name: string; // Include full_name
    phone_number: string; // Include phone_number
  }
}
