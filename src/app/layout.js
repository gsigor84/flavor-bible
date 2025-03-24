import { Ubuntu, Cabin } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
