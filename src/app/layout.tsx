'use client';

import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./context/LanguageContext";
import './globals.css';
import { UserProvider } from "./context/UserContext";
import { useLanguage } from "./context/LanguageContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

function BodyLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <UserProvider>
        <Navbar />
        <main>{children}</main>
      </UserProvider>
    </body>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <LanguageProvider>
        <BodyLayout>{children}</BodyLayout>
      </LanguageProvider>
    </html>
  );
}
