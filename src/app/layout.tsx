import "./globals.css";
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { BackToTop } from "./components/BackToTop";

const inter = Inter({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: "Precision Proteomics Center Davos",
  description:
    "Developing cutting-edge mass spectrometry proteomics workflows for clinical applications. Part of the Swiss Institute of Allergy and Asthma Research (SIAF), University of Zurich.",
  openGraph: {
    title: "Precision Proteomics Center Davos",
    description:
      "Developing cutting-edge mass spectrometry proteomics workflows for clinical applications. Part of SIAF, University of Zurich.",
    url: "https://precisionproteomics.uzh.ch",
    siteName: "Precision Proteomics Center Davos",
    images: [{ url: "/images/siaf_birdview.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Precision Proteomics Center Davos",
    description: "Cutting-edge proteomics for precision medicine. SIAF · University of Zurich.",
    images: ["/images/siaf_birdview.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${lora.variable}`}>
        <ConvexClientProvider>
          <div className="flex flex-col min-h-screen justify-between">
            <Navigation />
            <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 py-16 min-h-[70vh]">
              {children}
            </div>
            <Footer />
          </div>
          <BackToTop />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
