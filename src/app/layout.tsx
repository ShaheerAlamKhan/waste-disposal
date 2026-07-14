import type { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  title: "ReCircuit — Recycle your electronics the right way in San Diego",
  description:
    "ReCircuit helps San Diego residents recycle electronics the right way. Search certified e-waste drop-off sites by device or city, filter by what they accept, and sort by distance from where you are.",
  applicationName: "ReCircuit",
  authors: [{ name: "Shaheer Alam Khan" }],
  keywords: [
    "ReCircuit",
    "e-waste",
    "recycling",
    "electronic waste",
    "San Diego",
    "drop-off",
    "environment",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#059669" },
    { media: "(prefers-color-scheme: dark)", color: "#022c22" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overscroll-none`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
