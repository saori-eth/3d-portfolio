import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Canvas } from "./components/Canvas";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saori",
  description: "Hello there :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute inset-0 z-0">
          <Canvas />
        </div>
        <div className="relative z-10 select-none">{children}</div>
      </body>
    </html>
  );
}
