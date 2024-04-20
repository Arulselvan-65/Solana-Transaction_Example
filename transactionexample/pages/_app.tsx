import "../styles/globals.css";

import { NextPage } from "next";
import WalletContextProvider from "../components/WalletContextProvider";
import AppBar from "../components/AppBar";


const Home: NextPage = () =>{

    return(
        <>
            <WalletContextProvider>
                <AppBar></AppBar>
            </WalletContextProvider>
        </>
    )
}


export default Home;