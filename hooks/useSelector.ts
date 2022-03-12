import { TypedUseSelectorHook, useSelector as reduxUseSelector } from 'react-redux'
import type { RootState } from '@/store/index'
const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector
export default useSelector
