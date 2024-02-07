import { AnchorProvider, Program, Idl } from "@project-serum/anchor";

import {
    clusterApiUrl,
    ConfirmOptions,
    Connection,
    PublicKey,
} from "@solana/web3.js";

export interface IAddressToken {
    Link: string;
    Usdt: string;
    Dai: string;
    address: string;
  }
  
  export interface IAddressData {
    address: string;
  }
  
  export type stateContextType = {
    address: string;
    allTokensData: any;
    loading: boolean;
    web3Program: any;
    web3Provider: any;
    // newConnection: Connection;
    setAllTokenData: (data: any) => void;
    setAddress: (data: string) => void;
    setLoading: (data: boolean) => void;
    setProgram: (data: any) => void;
    setProvider: (data: any) => void;
    //setConnection: (data: any) => void;
  };
  