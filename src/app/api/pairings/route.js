import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { db } = await connectToDatabase();

    // Extract the selected meat ingredient from the query parameters
    const { searchParams } = new URL(req.url);
    const ingredient = searchParams.get("ingredient");

    if (!ingredient) {
      return NextResponse.json({ error: "Ingredient is required" }, { status: 400 });
    }

    // Find the meat and get only the vegetable pairings
    const pairingData = await db.collection("pairings").findOne({ ingredient });

    if (!pairingData) {
      return NextResponse.json({ error: "No pairings found" }, { status: 404 });
    }

    // Filter only vegetable pairings
    const vegetablePairings = pairingData.pairings.filter(p => p.category === "vegetable");

    return NextResponse.json({
      ingredient: pairingData.ingredient,
      pairings: vegetablePairings
    });
  } catch (error) {
    console.error("Error fetching pairings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
