declare let window: any
import Web3 from 'web3'
function isMetaMaskInstalled() {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
}
export function connectMetaMask() {
  return async (dispatch) => {
    if (window.ethereum) {
      // 請求
      if(!isMetaMaskInstalled()) await window.ethereum.request({ method: 'eth_requestAccounts' })
      const web3 = new Web3(window.ethereum)
      const account = await web3.eth.getAccounts()
      const payload = {
        web3,
        walletAccount: account,
      }
      dispatch(setWalletInfo(payload))
    }
  }
}

function setWalletInfo(payload) {
  return {
    type: 'CONNECT_WALLET',
    payload,
  }
}
