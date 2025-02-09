import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("❌ MONGODB_URI is not set in the environment variables!");
}

// Define connection options to prevent timeout errors
const options = {
  connectTimeoutMS: 30000, // 30 seconds
  serverSelectionTimeoutMS: 30000, // Allow MongoDB to be selected properly
  socketTimeoutMS: 45000, // Socket timeout
};

let client;
let clientPromise;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
    console.log("✅ Successfully connected to MongoDB!");
  }
  return { db: client.db("flavor_bible") };
}

// Assign `clientPromise` immediately
clientPromise = connectToDatabase();

export { connectToDatabase, clientPromise };
