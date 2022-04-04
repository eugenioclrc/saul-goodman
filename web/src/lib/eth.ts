import { writable, get } from "svelte/store";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import abi from './abi.json';



const CHAIN_ID = 80001;
const HEXCHAIN_ID = "0x"+CHAIN_ID.toString(16);

let _provider

export const provider = writable();
export const wallet = writable();
export const signer = writable();
export const wrongNetwork = writable(false);

export const contracts = { contractSaulgoodman: null };

export async function initMetamask() {
  // const { ethereum } = window;
  // await window.ethereum.enable()
  if (!_provider) {
    _provider = new Web3Provider(window.ethereum, "any");
    provider.set(_provider);
    _provider.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        setTimeout(() => {
          initMetamask();
        }, 0);
      }
    });

    window.ethereum.on("accountsChanged", () => {
      setTimeout(() => {
        initMetamask();
      }, 0);
    });
  }
  
  
  const _networkDetails = await _provider.getNetwork();
  
  if (_networkDetails.chainId !== CHAIN_ID) {
    wrongNetwork.set(true);
    return;
  } else {
    wrongNetwork.set(false);
  }
  const _signer = await _provider.getSigner();
  const _wallet = await _signer.getAddress();
  wallet.set(_wallet);
  signer.set(_signer);

  contracts.contractSaulgoodman = new Contract('0xa03160dff9f9eef03f6f6947d6cdbba4199a25a7', abi, _signer);  
}

export async function changeNetwork() {
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: HEXCHAIN_ID,
        chainName: "Polygon Mumbai",
        nativeCurrency: {
          name: "Matic",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      }]
  });
  
  // await initMetamask();
}
