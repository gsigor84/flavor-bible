import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ingredient = searchParams.get("meat"); // Selected meat
    const selectedVegetables = searchParams.get("vegetables")?.split(",") || [];

    if (!ingredient || selectedVegetables.length === 0) {
      return NextResponse.json({ error: "Missing meat or vegetables" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const pairingData = await db.collection("pairings").findOne({ ingredient });

    if (!pairingData || !pairingData.spices_herbs_pairings) {
      return NextResponse.json({ spices_herbs: [] }, { status: 200 });
    }

    console.log("Selected Meat:", ingredient);
    console.log("Selected Vegetables:", selectedVegetables);
    console.log("Spices & Herbs Pairings:", pairingData.spices_herbs_pairings);

    // Filter spices/herbs based on selected vegetables
    const matchedSpicesAndHerbs = pairingData.spices_herbs_pairings.filter(spice =>
      spice.pairs_with.some(veg =>
        selectedVegetables.map(v => v.toLowerCase()).includes(veg.toLowerCase())
      )
    );

    console.log("Matched Spices & Herbs:", matchedSpicesAndHerbs);

    // ✅ Ensure `pairs_with` is always included in response
    return NextResponse.json({
      spices_herbs: matchedSpicesAndHerbs.map(spice => ({
        name: spice.name,
        category: spice.category,
        pairs_with: spice.pairs_with || [] // ✅ Ensures `pairs_with` is always included
      }))
    });

  } catch (error) {
    console.error("Error fetching spices & herbs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
