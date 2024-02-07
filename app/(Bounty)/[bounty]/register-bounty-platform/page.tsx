/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Button from "@/library/components/atoms/Button";
import Input from "@/library/components/molecules/Input";
import React, { useState, useReducer } from "react";

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

import { USDC_MINT } from "../../../../library/constants";
import { useAppContext } from "@/library/context/state";

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

const page = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [values, updateValues] = useReducer(stateReducer, initialState);

    const [platformName, setPlatformName] = useState("");
    const { web3Program, web3Provider } = useAppContext();

    //@ts-ignore
    const { publicKey } = useWallet();

    const handleRegistration = async () => {
        try {
            const usdcMint = new PublicKey(USDC_MINT);

            const transaction = new Transaction();

            const userTokenAccount = await getAssociatedTokenAddress(
                usdcMint,
                publicKey as PublicKey
            );

            try {
                await getAccount(web3Provider.connection, userTokenAccount);
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

            await web3Provider.sendAndConfirm(transaction);

            const [bounty_platformPDA, _bounty_platformBump] =
                await web3.PublicKey.findProgramAddress(
                    [
                        utils.bytes.utf8.encode("bounty_platform"),
                        publicKey?.toBuffer() as Buffer,
                    ],
                    web3Program.programId
                );

            await web3Program.methods
                .initBounty_platform(platformName, "")
                .accounts({
                    bounty_platform: bounty_platformPDA,
                    bounty_platformVaultMint: usdcMint,
                    bounty_platformVaultTokenAccount: userTokenAccount,
                    authority: publicKey as PublicKey,
                    systemProgram: web3.SystemProgram.programId,
                })
                .signers([])
                .rpc();

            const createdBounty_platform =
                web3Program.account.bounty_platform.fetch(
                    bounty_platformPDA as Address
                );

            console.log(createdBounty_platform);

            // setDisplayType("is_bounty_platform");

            window.location.reload();
        } catch (e) {
            throw new Error(`Error creating bounty_platform: ${e}`);
        }
    };

  //   const handleRegistration = () => {
  //     // const usdcMint = new PublicKey(USDC_MINT);
  //     // const transaction = new Transaction();
  
  //     // const userTokenAccountPromise = getAssociatedTokenAddress(
  //     //     usdcMint,
  //     //     publicKey as PublicKey
  //     // );
  
  //     // const createAccountInstructionPromise = userTokenAccountPromise.then((userTokenAccount: any) => {
  //     //     return getAccount(web3Provider.connection, userTokenAccount)
  //     //         .then(() => {
  //     //             // Account already exists, no need to create
  //     //             return null;
  //     //         })
  //     //         .catch(() => {
  //     //             // Account doesn't exist, add instruction to create it
  //     //             return createAssociatedTokenAccountInstruction(
  //     //                 publicKey as PublicKey,
  //     //                 userTokenAccount,
  //     //                 publicKey as PublicKey,
  //     //                 usdcMint
  //     //             );
  //     //         });
  //     // });
  
  //     // createAccountInstructionPromise.then((createInstruction: web3.Transaction | web3.TransactionInstruction | web3.TransactionInstructionCtorFields) => {
  //     //     if (createInstruction) {
  //     //         transaction.add(createInstruction);
  //     //     }
  
  //     //     return web3Provider.sendAndConfirm(transaction);
  //     // }).then(() => {
  //     //     return web3.PublicKey.findProgramAddressSync(
  //     //         [
  //     //             utils.bytes.utf8.encode("bounty_platform"),
  //     //             publicKey?.toBuffer() as Buffer,
  //     //         ],
  //     //         web3Program.programId
  //     //     );
  //     // }).then(([bounty_platformPDA, _bounty_platformBump]: [any, any]) => {
  //     //     return web3Program.methods
  //     //         .initBounty_platform(platformName, "")
  //     //         .accounts({
  //     //             bounty_platform: bounty_platformPDA,
  //     //             bounty_platformVaultMint: usdcMint,
  //     //             bounty_platformVaultTokenAccount: userTokenAccountPromise,
  //     //             authority: publicKey as PublicKey,
  //     //             systemProgram: web3.SystemProgram.programId,
  //     //         })
  //     //         .signers([])
  //     //         .rpc()
  //     //         .then(() => {
  //     //             return bounty_platformPDA;
  //     //         });
  //     // }).then((bounty_platformPDA: Address) => {
  //     //     const createdBounty_platform = web3Program.account.bounty_platform.fetch(
  //     //         bounty_platformPDA as Address
  //     //     );
  //     //     console.log(createdBounty_platform);
  //     //     // setDisplayType("is_bounty_platform");
  //     //     window.location.reload();
  //     // }).catch((e: any)  => {
  //     //     throw new Error(`Error creating bounty_platform: ${e}`);
  //     // });
  // };
  
       


    const handleWalletConnect = () => {
        const address = "0x...."; // TODO: get address from wallet
        updateValues({ registrationAddress: address, paymentAddress: address });
    };

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
