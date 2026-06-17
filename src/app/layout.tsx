import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/layout/CustomCursor";
import LoadingScreen from "@/components/layout/LoadingScreen";
import SmoothScroll from "@/components/layout/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elite Futuristic Portfolio | Interactive Command Center",
  description: "Advanced immersive portfolio of a Data Scientist, Full Stack Developer, Android App Developer, and Web Pentester.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("ROOT LAYOUT RENDERED");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-white selection:bg-accent-blue/30`}
      >
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll>
          <main className="relative min-h-screen">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
