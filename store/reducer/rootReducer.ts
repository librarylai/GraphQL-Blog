import walletReducer from '@/store/reducer/walletReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  walletReducer: walletReducer,
})
export default rootReducer
