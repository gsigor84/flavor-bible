import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    if (!db) {
      throw new Error("❌ Database connection failed!");
    }

    console.log("📂 Database Selected:", db.databaseName);

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    return Response.json({
      success: true,
      message: "MongoDB connected!",
      collections: collectionNames,
    });
  } catch (error) {
    console.error("❌ Error in test-db route:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
