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
            <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" />
            </head>
            {children}
        </html>
    );
}
