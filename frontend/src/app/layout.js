import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next Stop",
  description:
    "AI-powered travel route recommendations tailored to your style and preferences.",
  keywords: [
    "Travel",
    "AI Travel Planner",
    "Trip Recommendations",
    "Next Stop",
    "Travel Itinerary",
    "Vacation Planning",
  ],
  type: "website",
};

// bg-neutralLight
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-neutralLight text-neutralDark min-h-screen flex flex-col`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
