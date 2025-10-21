import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Domotique IA - Blog Home Assistant",
    template: "%s | Domotique IA"
  },
  description: "Blog passionné sur la domotique Home Assistant. Tutoriels, guides et conseils pour rendre votre maison intelligente avec un chatbot IA pour vous aider.",
  keywords: ["home assistant", "domotique", "maison connectée", "automation", "tutoriels", "chatbot ia"],
  authors: [{ name: "Alexandre Lebegue" }],
  creator: "Alexandre Lebegue",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://domotique-ia.fr",
    siteName: "Domotique IA",
    title: "Domotique IA - Blog Home Assistant",
    description: "Blog passionné sur la domotique Home Assistant avec chatbot IA intégré",
  },
  twitter: {
    card: "summary_large_image",
    title: "Domotique IA - Blog Home Assistant",
    description: "Blog passionné sur la domotique Home Assistant",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}