"use client";

import { usePathname } from "next/navigation";
import NavWrapper from "@/components/NavWrapper";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Adjust based on your actual login route
  const hideLayout = ["/", "/login", "/signup"]; // ✅ includes homepage now


  const shouldHideLayout = hideLayout.includes(pathname);
  console.log("Current pathname:", pathname);

  return (
    <>
      {!shouldHideLayout && <NavWrapper />}
      <main className="flex-grow">{children}</main>
      {!shouldHideLayout && <Footer />}
    </>
  );
}
