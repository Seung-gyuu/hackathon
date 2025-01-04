import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-6 md:px-8 lg:px-16 lx:px-32 2xl:px-64 
        h-screen w-screen flex items-center justify-center bg-neutralLight`}
      >
        {children}
      </body>
    </html>
  );
}
