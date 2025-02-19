import { connectToDatabase } from "@/lib/mongodb"; // ✅ Correct import
import { getSession } from "@/lib/auth"; // Ensure this import is correct too


export async function GET(req) {
  try {
    const session = await getSession(req);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne(
      { email: session.user.email },
      { projection: { preferred_pairings: 1, _id: 0 } }
    );

    return new Response(JSON.stringify({ preferredPairings: user?.preferred_pairings || [] }), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching preferred pairings:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getSession(req);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { db } = await connectToDatabase();
    const body = await req.json();

    if (!body.preferredPairings || !body.preferredPairings.meat) {
      return new Response(JSON.stringify({ error: "Invalid data format" }), { status: 400 });
    }

    await db.collection("users").updateOne(
      { email: session.user.email },
      { $push: { preferred_pairings: body.preferredPairings } }
    );

    return new Response(JSON.stringify({ message: "Preferred pairings saved successfully!" }), { status: 200 });
  } catch (error) {
    console.error("❌ Error saving preferred pairings:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getSession(req);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { db } = await connectToDatabase();
    await db.collection("users").updateOne(
      { email: session.user.email },
      { $set: { preferred_pairings: [] } }
    );

    return new Response(JSON.stringify({ message: "Preferred pairings cleared successfully!" }), { status: 200 });
  } catch (error) {
    console.error("❌ Error clearing preferred pairings:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
