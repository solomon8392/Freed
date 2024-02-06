import MainNav from "@/lib/components/organisms/MainNav";
import { cn } from "@/lib/utils";
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
  title: "Bountypal",
  description: "Create smart bounties to kickstart more closed github issues",
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
        "relative flex w-full min-h-screen gap-4 flex-col items-center bg-[#fff] bg-[url(/grid--light.svg)]"
      )}
    >
      <MainNav />
      {children}
    </body>
  );
}
