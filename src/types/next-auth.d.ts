import type { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // id as string to align with NextAuth
    email: string;
    full_name: string;
    phone_number: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      full_name: string;
      phone_number: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    full_name: string;
    phone_number: string;
  }
}
