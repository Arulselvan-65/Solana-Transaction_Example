import { FC, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";


const MainPage: FC = () => {

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [signature, setSignature] = useState('');
    const [isTransactionComplete, setIsTransactionComplete] = useState(false);

    useEffect(() => {
        if (publicKey) {
            connection.getBalance(publicKey).then(e => setBalance(e / web3.LAMPORTS_PER_SOL));
        }
    });


    const onclick = () => {
        console.log(publicKey);

        if (!connection || !publicKey) {
            window.alert("Please connect your wallet to continue!!");
        }

        else {
            const transaction = new web3.Transaction();
            const toPublicKey = new web3.PublicKey(toAddress);

            if (balance > parseFloat(amount)) {
                const instructions = web3.SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: toPublicKey,
                    lamports: web3.LAMPORTS_PER_SOL * parseFloat(amount)
                })

                transaction.add(instructions);
                sendTransaction(transaction, connection).then(async (sig) => {
                    if (sig) {
                        setSignature(sig);
                        setIsTransactionComplete(true);
                        setAmount('');
                        setToAddress('');
                    }
                }).catch((err) => window.alert("Transaction Failed!!!"));
            }
            else{
                window.alert("Low Balance!!!!");
            }

        }
    }
    return (
        <div className="items-center flex flex-col">
            <h1 className="text-5xl font-roboto text-center mt-6">Transaction Demo Using Wallet</h1>
            <h1 className="text-center mt-20 text-3xl">Balance: {balance}</h1>

            <div className="flex flex-col">
                <label className="text-gray-200 mt-16 text-center text-3xl">Amount (in SOL) to send:</label>
                <input type="text" className="w-[550px] mt-2 h-12 bg-gray-200 border-none outline-none p-5 text-2xl rounded-md"
                value={amount} onChange={(e) => setAmount(e.target.value)} />

                <label className="text-gray-200 mt-16 text-center text-3xl">Send SOL to(Wallet Address):</label>
                <input type="text" className="w-[550px] mt-2 h-12 bg-gray-200 border-none outline-none p-5 text-[20px] rounded-md"
                value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
            </div>

            {isTransactionComplete ?
                <p className="mt-16 text-blue-600 text-[18px] underline"><a target="_blank" href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}>view on explorer</a></p>
                :
                <button onClick={onclick} className="bg-violet-700 border-none text-white text-[18px] h-14 w-[550px] mt-16 rounded-md ">Send</button>
            }
        </div>
    )
}


export default MainPage;