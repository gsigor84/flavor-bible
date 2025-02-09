import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create response and remove the cookie by setting its maxAge to 0
    const response = NextResponse.json({ message: "Logout successful!" }, { status: 200 });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0), // Expire the cookie immediately
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
