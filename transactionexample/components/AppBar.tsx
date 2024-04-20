import {FC} from "react";
import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

const AppBar: FC = ()=>{

    return(
        <div>
            <div className="top-0 sticky flex justify-between items-center p-[20px] 
                        pl-[50px] pr-[50px] shadow shadow-gray-600 h-20  phone:px-[10px]">
                <div>
                    <h1 className="text-violet-700 text-4xl font-varela font-semibold ">Demo</h1>
                </div>
                <div>
                    <WalletMultiButtonDynamic />
                </div>
            </div>
        </div>
    )
}


export default AppBar;