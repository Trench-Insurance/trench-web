import * as nearAPI from "near-api-js";
import { contract, account, wallet } from "$lib/stores/walletStore";
const { Contract, keyStores, connect, WalletConnection } = nearAPI;

export const setContract = (account) => {
    const cont = new Contract(
        account, // the account object that is connecting
        "singletondev.testnet",
        {
            // name of contract you're connecting to
            viewMethods: ["getCooldown", "getInsuredAmount", "getBasePremiumRate", "getTotalInsured", "calcPremium"], // view methods do not change state but usually return a value
            changeMethods: ["applyForInsurance", "claim"], // change methods modify state
        }
    );

    contract.set(cont);
}

export const initContract = async () => {
    const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
    const connectionConfig = {
        networkId: "testnet",
        keyStore: myKeyStore, // first create a key store 
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    };
    // @ts-ignore
    const nearConnection = await connect(connectionConfig);
    const walletConnection = new WalletConnection(nearConnection, "Trench");
    if (!walletConnection.isSignedIn()) {
        walletConnection.requestSignIn(
            "singletondev.testnet", // contract requesting access
            "Trench Insurance", // optional title
        );
    }


    wallet.set(walletConnection);
    account.set(walletConnection.account());
}