import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  console.log("🔍 Checking Token:", token); // Debugging: Check if token exists

  // If there is no token, redirect to login page
  if (!token) {
    console.warn("🚫 No token found, redirecting to login.");

    if (req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Verified:", decoded);

    // Allow request to continue
    return NextResponse.next();
  } catch (error) {
    console.error("🔴 JWT verification failed:", error);

    if (req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 403 });
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply middleware to protect dashboard and API routes that require authentication
export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"], // Protect dashboard and specific API routes
};
