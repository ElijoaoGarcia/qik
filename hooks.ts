import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store/app'
import { selectAuth } from './store/slices/auth'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSession = () => {
  const { profile } = useAppSelector(selectAuth)

  return {
    profile
  }
}
