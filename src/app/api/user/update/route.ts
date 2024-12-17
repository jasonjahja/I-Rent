import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const { fullName, phoneNumber, oldPassword, newPassword, email } = await req.json();

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Check old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Old password is incorrect." },
        { status: 401 }
      );
    }

    // Define the update data type using Prisma's UserUpdateInput
    const updatedData: Prisma.UserUpdateInput = {
      full_name: fullName,
      phone_number: phoneNumber,
    };

    // Update new password if provided
    if (newPassword) {
      updatedData.password = await bcrypt.hash(newPassword, 10);
    }

    // Update user in the database
    await prisma.user.update({
      where: { email },
      data: updatedData,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile." },
      { status: 500 }
    );
  }
}
