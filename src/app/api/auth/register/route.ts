import { NextResponse } from "next/server";
import { addUser } from "../../../../lib/userData";

export async function POST(request: Request) {
  try {
    const { full_name, email, password, phone_number } = await request.json();

    console.log("Request payload:", { full_name, email, password, phone_number });

    // Validate input presence
    if (!full_name || !email || !password || !phone_number) {
      return NextResponse.json(
        { error: "full_name, email, password, and phone_number are required." },
        { status: 400 }
      );
    }

    // Call the addUser function to create a new user
    const newUser = await addUser(full_name, email, password, phone_number);

    // If successful, return the newly created user
    return NextResponse.json(
      {
        message: "User registered successfully.",
        user: {
          user_id: newUser.user_id,
          full_name: newUser.full_name,
          email: newUser.email,
          phone_number: newUser.phone_number,
          created_at: newUser.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);

    // Handle errors from addUser function
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Something went wrong." },
        { status: 400 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { error: "An unknown error occurred." },
      { status: 500 }
    );
  }
}
