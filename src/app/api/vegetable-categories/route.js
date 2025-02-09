import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const vegetables = await db.collection("pairings").find({ category: "vegetable" }).toArray();

    // Ensure the response is a flat array of strings
    const vegetableNames = vegetables.map((veg) => veg.ingredient);

    return NextResponse.json(vegetableNames);
  } catch (error) {
    console.error("Error fetching vegetable categories:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
