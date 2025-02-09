import { Ubuntu, Cabin } from "next/font/google";

import "./globals.css";

// Import Ubuntu and Cabin fonts
const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // Ubuntu font weights
});

const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Cabin font weights
});

export const metadata = {
  title: "ViralVortex",
  description: "Minimalist and chic login experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${cabin.variable}`}>
      <body className="font-sans antialiased bg-white text-black">

        {/* ✅ Page Content */}
        <main className="px-4 sm:px-2 md:px-8 lg:px-12 py-6 sm:py-2 md:py-4 lg:py-12">
          {children}
        </main>

      </body>
    </html>
  );
}
