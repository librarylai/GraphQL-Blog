import { useDispatch as reduxUseDispatch } from 'react-redux'
import type { AppDispatch } from '@/store/index'
const useDispatch = () => reduxUseDispatch<AppDispatch>()
export default useDispatch
