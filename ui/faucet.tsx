"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner"

export const Faucet = () => {
    const { connection } = useConnection();
    const { publicKey, connected } = useWallet();
    const [sol, setSol] = useState<number>(1)
    const onClick = useCallback(async () => {
        if (!publicKey) return;
        try {
            const signature = await connection.requestAirdrop(publicKey, sol*1e9)
            toast.success("Airdrop Successful", {
              description: `Airdroped ${sol} SOL`,
              action: {
                label: "Done",
                onClick: () => console.log("Undo"),
              },
            })
            await connection.confirmTransaction(signature, "confirmed");
        }
        catch (e) {
            toast.error("You have reached your airdrop limit", {
              description: "Maximum of 2 requests every 8 hours",
              action: {
                label: "Done",
                onClick: () => console.log("Undo"),
              },
            })

        }
    }, [publicKey, connection]);
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center gap-4">
            <div className="my-2">
                <span className="font-bold text-4xl">
                    💦💦
                </span>
                <span className="text-4xl font-bold inline bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
                    SOLANA FAUCET 
                </span>
                <span className="font-bold text-4xl">
                    💦💦
                </span>
            </div>
            <div className="my-2 text-2xl font-bold text-red-600">
                This tool does *NOT* give real $SOL or Solana tokens.
            </div>
            <Input type="string" placeholder="SOL" onChange={(e) => {
                if (!isNaN(parseInt(e.target.value))) {
                    setSol(parseInt(e.target.value));
                }
            }} className="max-w-sm w-full block" />
            <div className="flex justify-center gap-3">
                {!connected ? (
                    <WalletMultiButton />
                ) : (
                    <WalletDisconnectButton>
                    {publicKey
                        ? publicKey.toString().substring(0, 6) + "..."
                        : "Disconnect"}
                    </WalletDisconnectButton>
                )}
                <Button onClick={onClick} className="w-fit" disabled={!publicKey}>
                    Send SOL
                </Button>
            </div>
            
            <div>
                Made with ♥ by VatsalCodes44
            </div>
        </div>
    );

}