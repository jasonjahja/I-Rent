import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all data from the database
    const users = await prisma.user.findMany();
    const vehicles = await prisma.vehicle.findMany();
    const rentals = await prisma.rental.findMany();

    return NextResponse.json({ users, vehicles, rentals }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch database data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
