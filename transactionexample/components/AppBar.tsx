import {FC} from "react";
import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

const AppBar: FC = ()=>{

    return(
        <div>
            <div className="flex bg-gray-950 w-full h-16 items-center justify-between px-10">
            <h1 className="text-violet-700 text-4xl font-varela font-semibold">Transaction Example</h1>
            <WalletMultiButtonDynamic/>
            </div>
        </div>
    )
}


export default AppBar;