import NextAuth from "next-auth";
import { authOptions } from "../../../../../auth"; // Make sure this is correct

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };