"use client";
import Providers from "@/library/providers/provider";
import "@/library/styles/globals.css";
import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";

//declare const window: any;

const bebas_neue = Bebas_Neue({
    subsets: ["latin"],
    weight: "400",
    preload: true,
    variable: "--font-bebas-neue",
});

// export const metadata: Metadata = {
//     title: "Bountypal",
//     description: "Create smart bounties to kickstart more closed github issues",
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    //const [web3Program, setProgram] = useState<Program>();
    //const [web3Provider, setProvider] = useState<AnchorProvider>();

    return (
        <html lang="en">
            <Providers>{children}</Providers>
        </html>
    );
}
