import { Ubuntu, Cabin } from "next/font/google";
import NavWrapper from "@/components/NavWrapper";
import Footer from "@/components/Footer"; // ✅ Import Footer
import "./globals.css";

// Import Ubuntu and Cabin fonts
const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Flavor Bible",
  description: "Find the perfect ingredient pairings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${cabin.variable}`}>
      <body className="font-sans antialiased bg-white text-black flex flex-col min-h-screen">
        <NavWrapper /> {/* ✅ Navbar */}
        <main className="flex-grow px-0 py-0 sm:px-2 sm:py-2 md:px-8 md:py-4 lg:px-12 lg:py-12">
          {children}
        </main>
        <Footer /> {/* ✅ Footer added */}
      </body>
    </html>
  );
}
