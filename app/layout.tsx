import MainNav from "@/Library/components/organisms/MainNav";
import "@/library/styles/globals.css";
import type { Metadata } from "next";

// const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className="relative flex w-full min-h-screen flex-col items-center gap-4 bg-[#ffffff] bg-[url(/grid--light.svg)]">
        <MainNav />
        {children}
      </body>
    </html>
  );
}
