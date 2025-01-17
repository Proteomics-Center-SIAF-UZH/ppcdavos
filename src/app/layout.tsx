import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Precision Proteomics Center Davos",
  description: "Official website for Precision Proteomics Center Davos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen justify-between">
          <Navigation />
          <div className="w-full px-16 sm:px-32 md:px-48 lg:px-64 py-16">{children}</div>
          <Footer />
        </div>
      </body>

    </html>
  );
}
