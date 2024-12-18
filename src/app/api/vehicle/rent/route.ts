import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { vehicleId } = await request.json();

    if (!vehicleId) {
      return NextResponse.json(
        { error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    // Update the vehicle status to 'UNAVAILABLE'
    await prisma.vehicle.update({
      where: { vehicle_id: parseInt(vehicleId) },
      data: { status: "UNAVAILABLE" },
    });

    return NextResponse.json({ message: "Vehicle rented successfully" });
  } catch (error) {
    console.error("Error updating vehicle status:", error);
    return NextResponse.json(
      { error: "Failed to rent the vehicle" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
