import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import NextAuthSessionProvider from "./provider";
import { Toaster } from "@/components/ui/sonner";
const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Home Servie & Repair",
  description: "Developed as a personal project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <NextAuthSessionProvider>
          <div className="md:px-10 px-4">
            <Header />
            {children}
            <Toaster />
          </div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
