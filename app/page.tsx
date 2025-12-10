"use client"
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import { Faucet } from '@/ui/faucet';

export default () => {
    return (
        <Faucet />
    );
};