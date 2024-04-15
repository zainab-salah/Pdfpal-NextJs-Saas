import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDFPal",
  description:
    "PDFPal: Your AI companion for effortless PDF comprehension. Upload your PDFs, and let our AI chatbot explain the content to you in plain language, making complex text accessible and understandable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={cn(
          "min-h-scrren font-sans antialiased grainy",
          inter.className
        )}
      >
             <Navbar />
        {children}
      </body>
    </html>
  );
}
