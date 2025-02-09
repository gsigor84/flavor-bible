import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ingredient = searchParams.get("meat");
    const selectedVegetables = searchParams.get("vegetables")?.split(",") || [];
    const selectedSpices = searchParams.get("spices")?.split(",") || [];

    if (!ingredient || selectedVegetables.length === 0 || selectedSpices.length === 0) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const pairingData = await db.collection("pairings").findOne({ ingredient });

    if (!pairingData || !pairingData.extra_pairings) {
      return NextResponse.json({ extra_pairings: [] }, { status: 200 });
    }

    // Match extra pairings based on selected vegetables **AND** spices
    const matchedExtras = pairingData.extra_pairings.filter(extra =>
      extra.pairs_with.some(item => selectedVegetables.includes(item) || selectedSpices.includes(item))
    );

    return NextResponse.json({ extra_pairings: matchedExtras });
  } catch (error) {
    console.error("Error fetching extra pairings:", error);
    return NextResponse.json({ extra_pairings: [] }, { status: 500 });
  }
}
