import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  // ✅ Support both Cookie and Authorization header
  const token =
    req.cookies.get("token")?.value || // Get from cookies
    req.headers.get("authorization")?.split("Bearer ")[1]; // Get from headers

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ user: { email: decoded.email } }, { status: 200 });
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
