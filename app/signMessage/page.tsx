"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ed25519 } from '@noble/curves/ed25519.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Transaction } from '@solana/web3.js';
import { useState } from 'react';
import { toast } from 'sonner';
import bs58 from "bs58"

export default function () {
    const {connection} = useConnection();
    const wallet = useWallet();
    const [message, setmessage] = useState("")

    const signMsg = async () => {
        if (!wallet.publicKey) return;
        try {
            // encoding the message into bytes
            const msg = new TextEncoder().encode(message)
            const signature = await wallet.signMessage!(msg)

            if(!ed25519.verify(signature,msg,wallet.publicKey.toBytes())) {
                throw new Error ("Invalid signature")
            }

            toast.success(`Message verified`, {
              description: bs58.encode(signature),
              action: {
                label: "Done",
                onClick: () => {},
              },
            })
        }
        catch (e) {
            toast.error("Invalid signature", {
              description: "",
              action: {
                label: "Done",
                onClick: () => {},
              },
            })
        }


    }
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className="h-screen w-full flex flex-col justify-center items-center gap-4">
                <div className="my-2">
                    <span className="font-bold text-4xl">
                        💦💦
                    </span>
                    <span className="text-4xl font-bold inline bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
                        Sign Message
                    </span>
                    <span className="font-bold text-4xl">
                        💦💦
                    </span>
                </div>
                <Input onChange={(e) => {
                    setmessage(e.target.value)
                }} type="string" placeholder="message" className="max-w-sm" />
                <div className="flex justify-center gap-3">
                    {!wallet.connected ? (
                        <WalletMultiButton />
                    ) : (
                        <WalletDisconnectButton>
                        {wallet.publicKey
                            ? wallet.publicKey.toString().substring(0, 6) + "..."
                            : "Disconnect"}
                        </WalletDisconnectButton>
                    )}
                    <Button onClick={signMsg} className={`w-fit`} disabled={!wallet.publicKey}>
                        Sign
                    </Button>
                </div>
                
                <div>
                    Made with ♥ by 
                    <a className="hover:underline " href="https://github.com/VatsalCodes44/solana-faucet" >
                        {` VatsalCodes44`}
                    </a>
                </div>
            </div>
        </div>
    )
}

