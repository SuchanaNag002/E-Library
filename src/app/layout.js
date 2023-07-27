"use client"
import "./globals.css";
import { Inter } from "next/font/google";
import "../styles/utils.css";
import { AuthContextProvider } from "@/context/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Library",
  description: "Online Library Application -> Borrow Books For Free",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
