import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase(); // Fix: Use connectToDatabase()

    const meats = await db.collection("pairings").find({ category: "meat" }).toArray();

    return NextResponse.json(meats);
  } catch (error) {
    console.error("Error fetching meats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
