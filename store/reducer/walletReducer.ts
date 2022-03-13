import Web3 from 'web3'
import ActionType from '@/store/actionTypes/index'

const initalState = {
  web3: null,
  walletAccount: null,
}
interface IWalletState {
  web3: Web3
  walletAccount: string
}
interface IConnectWallet {
  type: ActionType.CONNECT_WALLET
  payload: IWalletState
}
interface IClearWallet {
  type: ActionType.CLEAR_WALLET
}

export type Action = IConnectWallet | IClearWallet

export default function walletReducer(state: IWalletState = initalState, action: Action): IWalletState {
  switch (action.type) {
    case ActionType.CONNECT_WALLET:
      return {
        ...state,
        ...action.payload,
      }
    case ActionType.CLEAR_WALLET:
      return initalState
    default:
      return state
  }
}
