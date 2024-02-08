import {
    Keypair,
    PublicKey,
    SYSVAR_CLOCK_PUBKEY,
    SYSVAR_RENT_PUBKEY,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
    TransactionSignature,
    Connection,
    LAMPORTS_PER_SOL,
    ConfirmOptions
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";
import idl from "./idls/contract.json";
const IDL = require("./idls/contract.json");
import { AnchorProvider, Program, Idl, utils, web3, Address } from "@project-serum/anchor";
import { USDC_MINT } from "./constants";
import {
    createAssociatedTokenAccountInstruction,
    getAccount,
    getAssociatedTokenAddress,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";

//const PublicKey = anchor.web3.PublicKey;
export const PROGRAM_ID = new PublicKey(idl.metadata.address);
//const PublicKey = anchor.web3.PublicKey;
const connection = new anchor.web3.Connection(
    "https://api.devnet.solana.com/",
    //   "https://metaplex.devnet.rpcpool.com/",
    // "https://api.metaplex.solana.com/",
    { commitment: "confirmed" }
);
const networkUrl = "https://api.devnet.solana.com";
declare const window: any;

const opts = {
    preflightCommitment: "processed",
};

export async function send(wallet: any, transaction: any) {
    const txHash: any = await sendTransaction(wallet, transaction);
    let res = await connection.confirmTransaction(txHash);
    console.log(txHash);
    return txHash;
}

async function sendTransaction(wallet: any, transaction: any) {
    // if (wallet.publicKey === null || wallet.signTransaction === undefined) {
    //     console.log("375--------------------");
    //     return null;
    // }
    try {
        transaction.recentBlockhash = (
            await connection.getLatestBlockhash()
        ).blockhash;
        transaction.feePayer = wallet?.publicKey;
        const signedTransaction = await wallet?.signTransaction(transaction);
        const rawTransaction = signedTransaction.serialize();


        const txid = await connection.sendRawTransaction(rawTransaction, {
            skipPreflight: true,
            preflightCommitment: "processed",
        });
        return txid;
    } catch (e) {
        console.log("tx e = ", e);
        return null;
    }
}


export const getProvider = () => {
    //const connection = new Connection(networkUrl);

    const provider = new AnchorProvider(
        connection,
        window.solana,
        opts.preflightCommitment as ConfirmOptions
    );

    //console.log(provider);

    return provider;
};

export const getProgram = () => {

    let provider = new AnchorProvider(
        connection,
        window.solana,
        //wallet
        opts.preflightCommitment as ConfirmOptions
        //anchor.AnchorProvider.defaultOptions()
    );
    const program = new Program(idl as Idl, PROGRAM_ID, provider);

    return program;
};

export const setUSDC = async (wallet: any) => {
    try {
        const usdcMint = new PublicKey(USDC_MINT);

        const transaction = new Transaction();

        const userTokenAccount = await getAssociatedTokenAddress(
            usdcMint,
            wallet 
        );
        await getAccount(getProvider().connection, userTokenAccount);

        transaction.add(
            createAssociatedTokenAccountInstruction(
                wallet as PublicKey,
                userTokenAccount,
                wallet as PublicKey,
                usdcMint
            )
        );
        await send(wallet, transaction);
        //await getProvider().sendAndConfirm(transaction);
        return [usdcMint, userTokenAccount];
    } catch (e) {
        throw new Error(`Error setting up usdc: ${e}`);
    }
};



export const initBountyPlatform = async (wallet: any, platformName: any) => {
    // if (wallet.publicKey === null) throw new WalletNotConnectedError();

    const [usdcMint, userTokenAccount] = await setUSDC(wallet);
    let program = getProgram();

    const [bounty_platformPDA, _bounty_platformBump] =
        web3.PublicKey.findProgramAddressSync(
            [
                utils.bytes.utf8.encode("bounty_platform"),
                wallet?.toBuffer() as Buffer,
            ],
            PROGRAM_ID
        );

    const tx = new Transaction().add(
        await program.methods
            .initBountyPlatform(platformName, "")
            .accounts({
                bounty_platform: bounty_platformPDA,
                bounty_platform_vault_mint: usdcMint,
                bounty_platform_vault_token_account: userTokenAccount,
                authority: wallet as PublicKey,
                systemProgram: SystemProgram.programId,
                // rent: SYSVAR_RENT_PUBKEY,
            })
            // .signers([])
            // .rpc()
            .instruction()
    )

     await send(wallet, tx);
     const createdPlatform = program.account.bounty_platform.fetch(bounty_platformPDA as Address);

     console.log(createdPlatform);

     window.location.reload();
};




// export const setOperator = async (wallet) => {
//     if (wallet.publicKey === null) throw new WalletNotConnectedError();
//     if (wallet.publicKey.toBase58() !== ADMIN_WALLET.toBase58()) {
//         NotificationManager.error(`Admin can initialize only`);
//         return false;
//     }
//     let program = getProgram(wallet, connection);
//     const tx = new Transaction().add(
//         await program.methods
//             .setOperator(TREASURY_WALLET)
//             .accounts({
//                 admin: ADMIN_WALLET,
//                 globalState: getGlobalStateKey(),
//             })
//             .instruction()
//     );

//     return await send(wallet, tx);
// }

