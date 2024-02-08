"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

import { cn } from "@/library/utils";
import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    WalletProvider,
    useWallet,
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
import idl from "../../idls/contract.json";
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

// import { AppWrapper } from "../context/state";


const MainNav = () => {
    const segments = useSelectedLayoutSegments();

    
    const navItems = useMemo(
        () => [
            {
                name: "Home",
                href: "/",
                isActive: segments.length === 0,
            },
            {
                name: "Bounties",
                href: "/#bounties",
                isActive: segments.includes("blocs"),
            },
            {
                name: "FAQ",
                href: "/#faq",
                isActive: segments.includes("sgov"),
            },
        ],
        [segments]
    );



    const [newConnection, setConnection] = useState<Connection>();

    //const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const { address, setProgram, setAllTokenData, setProvider, setAddress } =
        useAppContext();
    //const wallet = useWallet();

    // const wallets = useMemo(
    //     () => [
    //         new PhantomWalletAdapter(),
    //         new GlowWalletAdapter(),
    //         new SolflareWalletAdapter({ network }),
    //     ],
    //     [network]
    // );

    const getProvider = () => {
        const connection = new Connection(networkUrl);
        //console.log(connection);
        setConnection(connection);

        const provider = new AnchorProvider(
            connection,
            window.solana,
            opts.preflightCommitment as ConfirmOptions
        );

        //console.log(provider);

        return provider;
    };

    const callFn = () => {
        try {

            const provider = getProvider();
          
            //console.log(provider);

            const program = new Program(idl as Idl, programID, provider);
            setProgram(program);
            setProvider(provider);
            //console.log(program);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setAddress("changed address")
        //console.log(`console.logging from main nav ${address}`)
        callFn();
    }, []);


 
    return (
        <div className="flex sticky top-0 w-full justify-between items-center bg-white px-6 py-3 border-b">
            <div className="flex-grow  gap-8">
                <Link className="rounded-full" href={"/"}>
                    <img
                        width={50}
                        height={50}
                        src="/bountypal.svg"
                        alt="bountypal logo"
                    />
                </Link>
                {/* <div className="flex gap-4">
          {navItems.map(({ name, href, isActive }) => (
            <Link
              key={name}
              href={href}
              className={cn(
                "flex items-center",
                { "bg-stone-200": isActive },
                "rounded-lg px-2 py-1.5 text-[#4E81FF] transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300"
              )}
            >
              {name}
            </Link>
          ))}
          <Link
            href={"/#create"}
            className={cn(
              "flex items-center rounded-lg bg-[#4E81FF] px-2 py-1.5 text-white transition-all duration-150 ease-in-out hover:bg-[#4E81FF] active:bg-[#4E81FF]"
            )}
          >
            Create
          </Link>
        </div> */}
            </div>

            <div className="flex justify-end mr-6 gap-4 h-fit">
                <div className="bg-[#4E81FF] rounded-full p-[5px]">
                    <img
                        width={25}
                        height={25}
                        src="/discord.svg"
                        alt="discord logo"
                    />
                </div>

                <div className="bg-[#4E81FF] rounded-full p-[5px]">
                    <img
                        width={25}
                        height={25}
                        src="/twitter.svg"
                        alt="twitter logo"
                    />
                </div>
                <div className="bg-[#4E81FF] rounded-full p-[5px]">
                    <img
                        width={25}
                        height={25}
                        src="/github.svg"
                        alt="github logo"
                    />
                </div>
            </div>

            <div className="flex gap-4 h-fit ">
                <div className=" bg-[#4E81FF] rounded-full">
                    <WalletModalProvider>
                        <WalletMultiButton />
                    </WalletModalProvider>
                </div>
            </div>
        </div>
    );
};

export default MainNav;
