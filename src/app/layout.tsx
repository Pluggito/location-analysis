import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: "Location Analysis Tab",
  description: "Allows the investor understand the deal’s surrounding market, development risks, and regional dynamics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
