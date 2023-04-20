import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store/store'

//estos hooks tiene el propósito de tipar los hooks de react-redux
//de esta forma no será necesario hacer exlicito los tipos en cada ocación que se usen
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector