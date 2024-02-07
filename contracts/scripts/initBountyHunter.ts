import React, { useState } from "react";
import {
    Address,
    AnchorProvider,
    Program,
    utils,
    web3,
} from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
    createAssociatedTokenAccountInstruction,
    getAccount,
    getAssociatedTokenAddress,
} from "@solana/spl-token";
import { USDC_MINT } from "../../library/constants";

type OnboardOptionProps = {
    setDisplayType: (displayType: string) => void;
    program: Program;
    provider: AnchorProvider;
};

const usdcMint = new PublicKey(USDC_MINT);
const transaction = new Transaction();