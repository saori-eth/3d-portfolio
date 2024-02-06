import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Canvas } from "./components/Canvas";
import { Header } from "./components/Header";

const font = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Saori",
  description: "Personal Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <Canvas>
          <div className="relative z-10 select-none">
            <Header />
            {children}
          </div>
        </Canvas>
      </body>
    </html>
  );
}
