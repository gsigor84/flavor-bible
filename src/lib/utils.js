import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

// ✅ Keep your existing Tailwind utility function
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ✅ Fix `getSession` to read token from `req.cookies`
export async function getSession(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      console.warn("🚫 No token found in request cookies");
      return null;
    }

    // 🔹 Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded }; // Return decoded user
  } catch (error) {
    console.error("❌ JWT Verification Failed:", error);
    return null;
  }
} // ❌ Fix: Removed extra closing parenthesis `)` and replaced with `}`
