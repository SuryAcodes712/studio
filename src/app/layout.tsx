import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Playfair_Display, PT_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/context/language-context";
import "./globals.css";

const fontSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-headline",
});


export const metadata: Metadata = {
  title: "Krishi Mitar",
  description: "AI-powered assistant for farmers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "font-body antialiased",
        fontSans.variable,
        fontSerif.variable
      )}>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
