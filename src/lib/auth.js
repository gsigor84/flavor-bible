import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { connectToDatabase } from "./mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getSession(req) {
  try {
    // ✅ Read the token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      console.warn("🚫 No token found in request cookies");
      return null;
    }

    // ✅ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return { user: decoded }; // ✅ Return user data from token
  } catch (error) {
    console.error("❌ JWT Verification Failed:", error);
    return null;
  }
}
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await connectToDatabase();
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return { id: user._id, email: user.email };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
