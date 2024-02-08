/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Button from "@/library/components/atoms/Button";
import Input from "@/library/components/molecules/Input";
import React, { useState, useReducer } from "react";

import { Buffer } from "buffer";
import * as BufferLayout from "@solana/buffer-layout";

import {
    Address,
    AnchorProvider,
    Program,
    utils,
    web3,
} from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
declare const window: any;

import {
    createAssociatedTokenAccountInstruction,
    getAccount,
    getAssociatedTokenAddress,
} from "@solana/spl-token";

import { USDC_MINT } from "../../../../library/constants";
import { useAppContext } from "@/library/context/state";
import {
    initBountyPlatform,
    send,
    getProvider,
    getProgram,
    PROGRAM_ID,
} from "@/library/helpers";
import * as anchor from "@project-serum/anchor";

export interface NewFundPool {
    registrationAddress: string;
    paymentAddress: string;
}

const initialState = {
    registrationAddress: "",
    paymentAddress: "",
};

const stateReducer = (
    current: NewFundPool,
    update: Partial<NewFundPool>
): NewFundPool => {
    return {
        ...current,
        ...update,
        // registrationAddress: undefined || "", // TODO: swap out undefined for the selected connected wallet
    };
};
const connection = new anchor.web3.Connection(
    "https://api.devnet.solana.com/",
    //   "https://metaplex.devnet.rpcpool.com/",
    // "https://api.metaplex.solana.com/",
    { commitment: "confirmed" }
);

const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [values, updateValues] = useReducer(stateReducer, initialState);

    const [platformName, setPlatformName] = useState("");
    const { web3Program, web3Provider, address } = useAppContext();
    console.log(
        `address rendering from register-bounty-platform page: ${address}`
    );
    //console.log(web3Provider);

    //@ts-ignore
    const provider = useWallet();
    const { publicKey } = useWallet();

    //console.log(publicKey);

    // const setUSDC = async () => {
    //     try {
    //         const usdcMint = new PublicKey(USDC_MINT);

    //         const transaction = new Transaction();

    //         const userTokenAccount = await getAssociatedTokenAddress(
    //             usdcMint,
    //             publicKey as PublicKey
    //         );
    //         await getAccount(getProvider().connection, userTokenAccount);

    //         transaction.add(
    //             createAssociatedTokenAccountInstruction(
    //                 publicKey as PublicKey,
    //                 userTokenAccount,
    //                 publicKey as PublicKey,
    //                 usdcMint
    //             )
    //         );
    //         await getProvider().sendAndConfirm(transaction);
    //         return [usdcMint, userTokenAccount];
    //     } catch (e) {
    //         throw new Error(`Error setting up usdc: ${e}`);
    //     }
    // };

    // const initPlatform = async (usdcMint: any, userTokenAccount: any) => {
    //     try {
    //         const [bounty_platformPDA, _bounty_platformBump] =
    //             web3.PublicKey.findProgramAddressSync(
    //                 [
    //                     utils.bytes.utf8.encode("bounty_platform"),
    //                     publicKey?.toBuffer() as Buffer,
    //                 ],
    //                 web3Program.programId
    //             );

    //         await web3Program.methods
    //             .initBountyPlatform(platformName, "")
    //             .accounts({
    //                 bounty_platform: bounty_platformPDA,
    //                 bounty_platform_vault_mint: usdcMint,
    //                 bounty_platform_vault_token_account: userTokenAccount,
    //                 authority: publicKey as PublicKey,
    //                 system_program: web3.SystemProgram.programId,
    //             })
    //             .signers([])
    //             .rpc();

    //         const createdBounty_platform =
    //             web3Program.account.bounty_platform.fetch(
    //                 bounty_platformPDA as Address
    //             );

    //         //console.log(createdBounty_platform);

    //         // setDisplayType("is_bounty_platform");

    //         window.location.reload();
    //     } catch (e: any) {
    //         throw new Error(`Error initializing bounty_platform: ${e}`);
    //     }

    // };

    const handleRegistration = async () => {
        //await initBountyPlatform(publicKey as unknown as any, platformName);

        try {
            const usdcMint = new PublicKey(USDC_MINT);
            //let usdcAcctInfo = await connection.getAccountInfo(usdcMint);
            //console.log(usdcAcctInfo)
            const transaction = new Transaction();
            const userTokenAccount = await getAssociatedTokenAddress(
                usdcMint,
                publicKey as PublicKey
            );
            //console.log(userTokenAccount)
            try {
                await getAccount(getProvider().connection, userTokenAccount);
            } catch (e) {
                transaction.add(
                    createAssociatedTokenAccountInstruction(
                        publicKey as PublicKey,
                        userTokenAccount,
                        publicKey as PublicKey,
                        usdcMint
                    )
                );
            }

            transaction.recentBlockhash = (
                await connection?.getLatestBlockhash()
            ).blockhash;
            transaction.feePayer = provider.publicKey as unknown as any;
            //@ts-ignore
            const signedTransaction = (await provider?.signTransaction(
                transaction
            )) as unknown as any;
            const rawTransaction = signedTransaction.serialize();

            const txid = await connection?.sendRawTransaction(rawTransaction, {
                skipPreflight: true,
                preflightCommitment: "processed",
            });
            await connection?.confirmTransaction(txid);

            //await web3Provider.sendAndConfirm(transaction);
            //await send(publicKey, transaction);

            const [bountyPlatformPDA, _] =
                anchor.web3.PublicKey.findProgramAddressSync(
                    [
                        //utils.bytes.utf8.encode("bounty_platform"),
                        Buffer.from("bounty_platform"),
                        publicKey?.toBuffer() as Buffer,
                    ],
                    //getProvider()?.programId as Program
                    web3Program?.programId
                );
            //console.log("bountyPlatformPDA");
            //console.log(bountyPlatformPDA);

            // console.log(usdcMint)
            //console.log(userTokenAccount)
            //@ts-ignore
            //const transaction2: any = new Transaction().add(
                await getProgram()
                    .methods.initBountyPlatform(platformName)
                    .accounts({
                        bounty_platform: bountyPlatformPDA,
                        bounty_platform_vault_mint: usdcMint,
                        bounty_platform_vault_token_account: userTokenAccount,
                        authority: publicKey as PublicKey,
                        system_program: web3.SystemProgram.programId,
                    })
                    //.instruction()
                    .signers([])
                    .rpc()
           // );

            // transaction2.recentBlockhash = (
            //     await connection?.getLatestBlockhash()
            // ).blockhash;
            // transaction2.feePayer = provider.publicKey as unknown as any;
            // //@ts-ignore
            // const signedTransaction2 = (await provider?.signTransaction(
            //     transaction2
            // )) as unknown as any;
            // const rawTransaction2 = signedTransaction2.serialize();
            // const txid2 = await connection.sendRawTransaction(rawTransaction2, {
            //     skipPreflight: true,
            //     preflightCommitment: "processed",
            // });

            // await connection.confirmTransaction(txid2);




            // await send(publicKey, transaction2);

            // await getProgram().methods
            //     .initBountyPlatform(platformName, "")
            //     .accounts({
            //         bounty_platform: bounty_platformPDA,
            //         bounty_platform_vault_mint: usdcMint,
            //         bounty_platform_vault_token_account: userTokenAccount,
            //         authority: publicKey as PublicKey,
            //         system_program: web3.SystemProgram.programId,
            //     })
            //     .signers([])
            //     .rpc();

            const createdBounty_platform =
                web3Program.account.bounty_platform.fetch(
                    bountyPlatformPDA as Address
                );
            //console.log(createdBounty_platform);

            // setDisplayType("is_bounty_platform");

            window.location.reload();
        } catch (e) {
            throw new Error(`Error creating bounty_platform: ${e}`);
        }
    };

    const handleWalletConnect = () => {
        const address = "0x...."; // TODO: get address from wallet
        updateValues({ registrationAddress: address, paymentAddress: address });
    };

    // useEffect(() => {
    //     //etAddress("changed address")
    //     //console.log(`console.logging from main nav ${address}`)
    //   console.log(platformName)
    // }, []);

    return (
        <div className="flex flex-col gap-8 p-4 bg-white rounded-lg relative after:absolute after:-z-[10] after:inset-0 after:content-[''] after:bg-[#ffffff87] after:backdrop-blur-sm after:translate-x-[-8px] after:translate-y-[8px] after:rounded-lg w-[450px]">
            <div className="flex flex-col text-[#2D2D2C]">
                <h3 className=" text-lg font-bold">
                    Register as Bounty Platform
                </h3>
            </div>

            <div
                className="flex flex-col gap-4"
                style={{
                    display: "flex",
                }}
            >
                <Input
                    type="text"
                    label="Platform Name"
                    value={platformName}
                    onChange={(e) =>
                        // updateValues({ registrationAddress: e.target.value })
                        setPlatformName(e.target.value)
                    }
                />
                {/* <p>{platformName}</p> */}
            </div>
            <Button
                className="w-full max-w-[480px]"
                text={"Register as bounty platform"}
                handleClick={handleRegistration}
            />

            {/* {values.registrationAddress ? (
        <Button
          className="w-full max-w-[480px]"
          text={"Register as bounty creator"}
          handleClick={handleRegistration}
        />
      ) : (
        <Button
          className="w-full max-w-[480px]"
          text={"Connect wallet"}
          handleClick={handleWalletConnect}
        />
      )} */}
        </div>
    );
};

export default page;
