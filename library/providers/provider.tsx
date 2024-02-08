"use client";
import React, { Provider, useEffect, useMemo, useState } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    WalletProvider,
    useWallet,
} from "@solana/wallet-adapter-react";
import { AppWrapper, useAppContext } from "@/library/context/state";

import {
    clusterApiUrl,
    ConfirmOptions,
    Connection,
    PublicKey,
} from "@solana/web3.js";

import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    GlowWalletAdapter,
} from "@solana/wallet-adapter-wallets";

//declare const window: any;


const network = WalletAdapterNetwork.Devnet;

const networkUrl = "https://api.devnet.solana.com";

function Providers({ children }: { children: React.ReactNode }) {

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SolflareWalletAdapter({ network }),
        ],
        [network]
    );
    
    return (
        <AppWrapper>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    {children}
                </WalletProvider>
            </ConnectionProvider>
        </AppWrapper>
    );
}

export default Providers;
