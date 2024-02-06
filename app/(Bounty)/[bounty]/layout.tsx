import MainNav from "@/lib/components/organisms/MainNav";
import { cn } from "@/lib/utils";
import "@/library/styles/globals.css";
import type { Metadata } from "next";

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
    <body className={cn("temp-gradient min-h-screen w-full")}>
      <div className="relative flex w-full min-h-screen flex-col items-center gap-16 bg-[url(/grid--dark.svg)]">
        <MainNav />
        {children}
      </div>
    </body>
  );
}
