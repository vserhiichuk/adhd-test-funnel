import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "BrainsMate · ADHD Trait Test", template: "%s · BrainsMate" },
  description: "Find out how ADHD traits influence your focus, energy, and daily life",
  icons: { icon: "/icons/brain.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-page font-sans text-ink">{children}</body>
    </html>
  );
}
