import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  verification: {
    google: "_JrO_MaNoIi5LH-CPg-uIJ6NfL_Q1IuDfnq28Cg85Cg",
  },
  title: {
    default: "Sell My Yacht Dubai | Luxury Yachts For Sale in Dubai",
    template: "%s | Sell My Yacht Dubai",
  },
  description:
    "Browse premium luxury yachts for sale in Dubai. Expert yacht brokerage services. Find your perfect vessel or list your yacht with Dubai's trusted yacht specialists.",
  keywords: [
    "yachts for sale Dubai",
    "luxury yachts Dubai",
    "yacht brokerage Dubai",
    "sell my yacht Dubai",
    "buy yacht Dubai",
    "Dubai Marina yachts",
  ],
  openGraph: {
    title: "Sell My Yacht Dubai | Luxury Yachts For Sale",
    description: "Premium luxury yachts for sale in Dubai. Expert brokerage services.",
    type: "website",
    locale: "en_AE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <GoogleTagManager gtmId="GTM-TM58K52R" />
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-YP3J47QB8F" />
    </html>
  );
}
