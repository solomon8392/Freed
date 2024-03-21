import { cn } from "@/library/utils";
import "@/library/styles/globals.css";
import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  preload: true,
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "Freed",
  description: "Frelanc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
      className={cn(
        bebas_neue.variable,
      )}
    >
      {children}
    </body>
  );
}
