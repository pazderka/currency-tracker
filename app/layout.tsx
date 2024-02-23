import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "@/globals.css";
import Navbar from "@/_components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Currency exchange tracker",
  description: "This is a simple currency exchange tracker application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <Navbar />
          <div className="m-4">{children}</div>
        </Suspense>
      </body>
    </html>
  );
}
