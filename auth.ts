import NextAuth, { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { User } from "next-auth";

import { validateUser } from "./src/lib/userData";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);
        
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password");
          return null;
        }
      
        try {
          const user = await validateUser(credentials.email, credentials.password);
      
          if (!user) {
            console.error("Invalid credentials for email:", credentials.email);
            return null;
          }
      
          // Ensure all required fields are returned
          return {
            id: String(user.id),        // Prisma ID converted to string
            email: user.email,          // Email
            name: user.full_name,       // Map full_name to name
            phone_number: user.phone_number, // Include phone_number
            image: null,                // Set image to null (default)
            full_name: user.full_name,  // Include full_name explicitly
          };
        } catch (error) {
          console.error("Error authorizing user:", error);
          return null;
        }
      },        
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET || "default_jwt_secret",
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | null }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.full_name = user.full_name;
        token.phone_number = user.phone_number;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id as string,
        email: token.email,
        full_name: token.full_name,
        phone_number: token.phone_number,
      };
      return session;
    },
  },  
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

// Export `auth` function for server-side usage
export const auth = async () => {
  return getServerSession(authOptions);
};

export { handler as GET, handler as POST };
