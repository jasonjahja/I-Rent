/*
  Warnings:

  - Changed the type of `vehicle_type` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('scooter', 'bike');

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "vehicle_type",
ADD COLUMN     "vehicle_type" "VehicleType" NOT NULL;
