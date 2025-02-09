import { connectToDatabase } from "./mongodb";
import { ObjectId } from "mongodb";

// Function to get a user by email
export async function getUserByEmail(email) {
  try {
    const { db } = await connectToDatabase();
    return await db.collection("users").findOne({ email });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return null;
  }
}

// Function to create a new user (for signup)
export async function createUser(userData) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("users").insertOne(userData);
    return result.insertedId;
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return null;
  }
}
