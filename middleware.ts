// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server"; // Import NextRequest type
// import { getToken } from "next-auth/jwt";

// export async function middleware(req: NextRequest) { // Type the req parameter
//   const token = await getToken({ req, secret: process.env.JWT_SECRET });

//   // Check if the token exists and the user has the "admin" role
//   if (!token || token.role !== "admin") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"], // Protect /admin and its subpaths
// };
