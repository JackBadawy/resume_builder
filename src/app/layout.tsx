import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Create a Resume in Word and Pdf Format",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./img/icon.png" />
      </head>
      <body className="bg-cover bg-[url('./img/bgImg.jpg')]">{children}</body>
    </html>
  );
}
