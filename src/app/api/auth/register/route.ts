// import { NextResponse } from "next/server";
// import { addUser } from "../../../../lib/userData";

// export async function POST(request: Request) {
//   try {
//     const { username, email, password } = await request.json();

//     console.log("Request payload:", { username, email, password});

//     // Validate input presence
//     if (!username || !email || !password) {
//       return NextResponse.json(
//         { error: "Username, email, password are required." },
//         { status: 400 }
//       );
//     }

//     // Call the addUser function to create a new user
//     const newUser = await addUser(username, email, password);

//     // If successful, return the newly created user
//     return NextResponse.json(
//       {
//         message: "User registered successfully.",
//         user: {
//           id: newUser.id,
//           username: newUser.username,
//           email: newUser.email
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error in POST handler:", error);

//     // Handle errors from addUser function
//     if (error instanceof Error) {
//       return NextResponse.json(
//         { error: error.message || "Something went wrong." },
//         { status: 400 }
//       );
//     }

//     // Handle unknown errors
//     return NextResponse.json(
//       { error: "An unknown error occurred." },
//       { status: 500 }
//     );
//   }
// }
