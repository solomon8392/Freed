import * as anchor from "@project-serum/anchor";
import { Address, Program } from "@project-serum/anchor";
import {
    createAccount,
    createMint,
    getAccount,
    mintTo,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey, Keypair } from "@solana/web3.js";

import { Contract } from "../target/types/contract";