import { writable } from "svelte/store";

export const ipfs = writable();

let promiseReady;

export async function init() {
  if (promiseReady) {
    return promiseReady;
  }
  promiseReady = (async () => {
    const _ipfs = await window.IpfsCore.create();
    ipfs.set(_ipfs);
    
  })();
  return promiseReady;
}




