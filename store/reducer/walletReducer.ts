
const initalState = {
  web3: null,
  walletAccount: null,
}
export default function walletReducer(state = initalState, action) {
    console.log('action',action)
    switch (action.type) {
    case 'CONNECT_WALLET':
      return { 
          ...state,
          ...action.payload
       }
    default:
      return state
  }
}
