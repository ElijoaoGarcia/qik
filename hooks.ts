import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store/app'
import { selectAuth } from './store/utils'
import { useColorScheme } from 'react-native'
import Colors from './constants/Colors'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSession = () => {
  const auth = useAppSelector(selectAuth)

  return auth
}

export const useColors = () => {
  const theme = useColorScheme() ?? 'light'

  return Colors[theme]
}

export const useCheckSession = () => {
  const { profile, sessionId } = useSession()

  return sessionId.length > 0 && `${profile.id}`.length > 0
}
