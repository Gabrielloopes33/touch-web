import React from "react";
import "./css/style.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Header from '@/components/ui/header';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agência Touch",
  description: "Sua marca precisa ser vista. Nós mostramos com imagem, som e resultado.",
  icons: {
    icon: '/images/pontot.png',
    apple: '/images/pontot.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className="flex h-full flex-col dark:bg-gray-900">
        <Header />
        <main className="grow">
          {children}
        </main>
      </body>
    </html>
  );
}
