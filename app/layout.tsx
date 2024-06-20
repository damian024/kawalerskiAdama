import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kawalerski",
  description: "Męczymy Adasia zanim Karolina go zamęczy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <body className={inter.className}>
        <Navbar/>
        <main id="content" className="flex flex-grow">
          <div className="bg-white flex-1">
            <div className="h-screen bg-white text-black">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
