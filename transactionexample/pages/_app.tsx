import "../styles/globals.css";
import MainPage from "./MainPage";

import { NextPage } from "next";
import WalletContextProvider from "../components/WalletContextProvider";
import AppBar from "../components/AppBar";


const Home: NextPage = () =>{

    return(
        <>
            <WalletContextProvider>
                <AppBar></AppBar>
                <MainPage/>
            </WalletContextProvider>
           
        </>
    )
}


export default Home;