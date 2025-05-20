import { useContext } from "react";
import WalletContext from "./walletContex";


export const useWallet = () => useContext(WalletContext);
