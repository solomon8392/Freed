//"use client";
import { createContext, useContext, useState } from "react";
import { stateContextType } from "../types/state";
import {
    clusterApiUrl,
    ConfirmOptions,
    Connection,
    PublicKey,
} from "@solana/web3.js"
import { AnchorProvider, Program, Idl } from "@project-serum/anchor";

const contextDefaultValue: stateContextType = {
    allTokensData: {},
    address: "",
    setAllTokenData: () => null,
    setAddress: () => null,
    loading: false,
    setLoading: () => null,
    web3Program: {},
    web3Provider: {},
    // newConnection: {},
    setProgram: () => null,
    setProvider: () => null,
    //setConnection: () => null
};

type StateContextProviderProps = {
    children: React.ReactNode;
};

const AppContext = createContext<stateContextType>(contextDefaultValue);

export function AppWrapper({ children }: StateContextProviderProps) {
    const [allTokensData, setAllTokenData] = useState<any>();
    const [address, setAddress] = useState<string>("default address");
    const [loading, setLoading] = useState<boolean>(false);

    const [web3Program, setProgram] = useState<any>();
    const [web3Provider, setProvider] = useState<any>();
    const [newConnection, setConnection] = useState<any>();

    let sharedState = {
        allTokensData,
        setAllTokenData,
        address,
        setAddress,
        loading,
        setLoading,
        web3Program,
        setProgram,
        web3Provider,
        setProvider,
    };

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
