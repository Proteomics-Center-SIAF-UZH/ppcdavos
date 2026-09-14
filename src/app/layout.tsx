import "./globals.css";
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ScrollProgress } from "./components/ScrollProgress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

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
      <body className={`${inter.variable} ${lora.variable}`}>
        <ConvexClientProvider>
          <ScrollProgress />
          <div className="flex flex-col min-h-screen justify-between">
            <Navigation />
            <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 py-20 min-h-[80vh]">
              {children}
            </div>
            <Footer />
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
