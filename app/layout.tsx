"use client";
import Providers from "@/library/providers/provider";
import "@/library/styles/globals.css";
import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";

//declare const window: any;

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";

import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    GlowWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
    clusterApiUrl,
    ConfirmOptions,
    Connection,
    PublicKey,
} from "@solana/web3.js";
import { AnchorProvider, Program, Idl } from "@project-serum/anchor";
import { Provider, useEffect, useMemo, useState } from "react";
import idl from "../library/idls/contract.json";
// import Providers from "@/library/providers/provider";
require("@solana/wallet-adapter-react-ui/styles.css");
import { useAppContext } from "@/library/context/state";
declare const window: any;

const network = WalletAdapterNetwork.Devnet;

const networkUrl = "https://api.devnet.solana.com";

const programID = new PublicKey(idl.metadata.address);
const opts = {
    preflightCommitment: "processed",
};

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
    const [newConnection, setConnection] = useState<Connection>();

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const { setProgram, setProvider } = useAppContext();

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SolflareWalletAdapter({ network }),
        ],
        [network]
    );

    const getProvider = () => {
        const connection = new Connection(networkUrl);
        console.log(connection);
        setConnection(connection);

        const provider = new AnchorProvider(
            connection,
            window.solana,
            opts.preflightCommitment as ConfirmOptions
        );

        console.log(provider);

        return provider;
    };

    const callFn = () => {
        try {
            const provider = getProvider();

            const program = new Program(idl as Idl, programID, provider);
            //setProvider(provider);
            setProvider(provider);
            console.log(provider);
            //setProgram(program);
            setProgram(program);
            console.log(program);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        callFn();
    }, []);

    return (
        <html lang="en">
            {/* <Providers> */}
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    {children}
                </WalletProvider>
            </ConnectionProvider>
            {/* </Providers> */}
        </html>
    );
}
