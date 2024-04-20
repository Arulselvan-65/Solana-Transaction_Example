import {FC} from "react";
import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

const AppBar: FC = ()=>{

    return(
        <div>
            <div className="flex bg-black w-full h-16 items-center justify-between px-10">
            <h1 className="text-blue-400 text-4xl">H A M S</h1>
            <WalletMultiButtonDynamic/>
            </div>
        </div>
    )
}


export default AppBar;