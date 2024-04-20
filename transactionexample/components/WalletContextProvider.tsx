'use client'

import React, { FC, ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import * as web3 from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

const Wallet: FC<{children: ReactNode}> = ({children}) => {
    const endpoint = web3.clusterApiUrl("devnet");
    const wallets =  [new PhantomWalletAdapter()];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                   {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default Wallet;