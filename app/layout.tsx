import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/lib/context";
import Nav from "./_components/Nav";
import Footer from "./_components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pete'llence — The Science of Pet Wellness",
  description: "Ultra-luxury pet nutraceuticals crafted from Italian ingredients and Ayurvedic wisdom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body style={{ fontFamily: "var(--font-lato), sans-serif", background: "#1A0609", color: "#F2E8D5" }}>
        <AppProviders>
          <Nav />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
