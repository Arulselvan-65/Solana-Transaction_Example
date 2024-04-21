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
            //Retrieving the balance from the account connected using getBalance()
            connection.getBalance(publicKey).then(e => setBalance(e / web3.LAMPORTS_PER_SOL));
        }
    });


    const onclick = () => {
        if (!connection || !publicKey) {
            window.alert("Please connect your wallet to continue!!");
        }

        else {
            //Creating a Transaction
            const transaction = new web3.Transaction();
            //converting the input into a Public Key
            const toPublicKey = new web3.PublicKey(toAddress);

            if (balance > parseFloat(amount)) {
                const instructions = web3.SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: toPublicKey,
                    lamports: web3.LAMPORTS_PER_SOL * parseFloat(amount)
                })

                //Adding the instructions to the Transaction
                transaction.add(instructions);

                //Sending transaction 
                sendTransaction(transaction, connection).then(async (sig) => {
                    if (sig) {
                        setSignature(sig);
                        setIsTransactionComplete(true);
                        setAmount('');
                        setToAddress('');
                    }
                }).catch((err) => window.alert("Transaction Failed!!!"));
            }
            else {
                window.alert("Low Balance!!!!");
            }
        }
    }

    return (
        <div>
            <h1 className="text-5xl font-roboto text-center mt-6 w-full text-wrap phone:leading-normal phone:text-4xl">Transaction Demo Using Wallet</h1>
            <h1 className="text-center mt-20 text-3xl phone:mt-14">Balance: {balance}</h1>

            <div className="flex w-full items-center justify-center ">
                <div className="flex flex-col justify-center  w-[50%] phone:w-[90%] ">

                        <label className="text-gray-200 text-3xl mt-14 phone:text-[23px]">Amount (in SOL) to send:</label>
                        <input type="text" className="w-[100%] mt-2 h-12 bg-gray-200 border-none outline-none p-5 text-2xl rounded-md"
                            value={amount} onChange={(e) => setAmount(e.target.value)} />

                        <label className="text-gray-200 text-3xl mt-14 phone:text-[23px]">Send SOL to(Wallet Address):</label>
                        <input type="text" className="w-[100%] mt-2 h-12 bg-gray-200 border-none outline-none p-5 text-[20px] rounded-md"
                            value={toAddress} onChange={(e) => setToAddress(e.target.value)} />

                    <div className="w-[100%]">
                        {isTransactionComplete ?
                            <p className="mt-16 text-blue-600 text-[18px] underline text-center"><a target="_blank" href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}>view on explorer</a></p>
                            :
                            <button onClick={onclick} className="bg-violet-700 border-none text-white text-[18px] h-14 w-[100%] mt-16 rounded-md ">Send</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MainPage;
