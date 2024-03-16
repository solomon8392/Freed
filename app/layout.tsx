"use client";
import "@/library/styles/globals.css";
import { Bebas_Neue } from "next/font/google";


const bebas_neue = Bebas_Neue({
    subsets: ["latin"],
    weight: "400",
    preload: true,
    variable: "--font-bebas-neue",
});


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            {children}
        </html>
    );
}
