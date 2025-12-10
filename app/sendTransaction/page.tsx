"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useState } from 'react';
import { toast } from 'sonner';

export default function () {
    const {connection} = useConnection();
    const wallet = useWallet();
    const [reciever, setReciever] = useState("")
    const [sol, setSol] = useState(0)

    const sendSol = async () => {
        if (!wallet.publicKey) return;
        try {
            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey : wallet.publicKey,
                toPubkey: new PublicKey(reciever),
                lamports: sol*LAMPORTS_PER_SOL
            }))
            const signature = await wallet.sendTransaction(transaction, connection)
            toast.success(`Transferred ${sol} SOL`, {
              description: signature,
              action: {
                label: "Done",
                onClick: () => {},
              },
            })
        }
        catch (e) {
            toast.error("Transaction failed", {
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
                        Send Transaction 
                    </span>
                    <span className="font-bold text-4xl">
                        💦💦
                    </span>
                </div>
                <div className='grid grid-cols-10 max-w-sm gap-2'>
                    <Input onChange={(e) => {
                        setReciever(e.target.value)
                    }} type="string" placeholder="Public Key" className="col-span-8" />
                    <Input onChange={(e) => {
                        if (!isNaN(parseFloat(e.target.value))) {
                            setSol(parseFloat(e.target.value))
                        }
                        else {
                            setSol(0);
                        }
                    }} type="string" placeholder="SOL" className="col-span-2 " />
                </div>
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
                    <Button onClick={sendSol} className={`w-fit`} disabled={!wallet.publicKey}>
                        Send SOL
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

