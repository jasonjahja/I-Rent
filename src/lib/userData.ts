import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Add a new user to the database.
 * @param full_name - User's full name.
 * @param email - User's email.
 * @param password - Plain text password.
 * @param phone_number - User's phone number.
 * @returns The created user object.
 */
export async function addUser(
  full_name: string,
  email: string,
  password: string,
  phone_number: string
) {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }

    // Validate password strength
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    // Validate phone number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone_number)) {
      throw new Error("Invalid phone number format.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        full_name,
        email,
        password: hashedPassword,
        phone_number,
      },
    });

    return newUser;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const targetFields = error.meta?.target as string[];

      if (targetFields?.includes("email")) {
        throw new Error("This email is already registered. Please use a different email.");
      }
      if (targetFields?.includes("phone_number")) {
        throw new Error("This phone number has already been used. Please choose another.");
      }
    }

    // Re-throw validation or known error
    if (error instanceof Error) {
      throw error;
    }

    // Log and throw a generic error
    console.error("Unexpected error adding user:", error);
    throw new Error("An unexpected error occurred.");
  }
}

/**
 * Validate a user's credentials.
 * @param email - User's email.
 * @param password - Plain text password.
 * @returns The user object if valid, or null if invalid.
 */
export async function validateUser(email: string, password: string) {
  try {
    // Find user by email (unique field)
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null; // User not found
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null; // Incorrect password
    }

    return user; // Valid user
  } catch (error) {
    console.error("Error validating user:", error);
    throw new Error("Failed to validate user credentials.");
  }
}

/**
 * Get all users (for debugging or admin purposes).
 * @returns A list of all users.
 */
export async function getUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        user_id: true,
        full_name: true,
        email: true,
        phone_number: true,
        created_at: true,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users.");
  }
}
