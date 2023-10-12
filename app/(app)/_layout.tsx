import { Redirect, Stack } from 'expo-router'
import { useAppDispatch, useCheckSession, useSession } from '../../hooks'
import { useEffect } from 'react'
import { moviesThunkActions } from '../../store/thunk-actions/movies'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
}

export default function RootLayout () {
  const dispatch = useAppDispatch()
  const hasSession = useCheckSession()
  const { sessionId } = useSession()

  const fetchFavoritesMovies = async () => await dispatch(moviesThunkActions.favorites(sessionId))
  const fetchRatedMovies = async () => await dispatch(moviesThunkActions.rated(sessionId))

  useEffect(() => {
    if (sessionId) {
      void fetchFavoritesMovies()
      void fetchRatedMovies()
    }
  }, [sessionId])

  if (!hasSession) return <Redirect href='/signin' />

  return (
    <Stack
      initialRouteName='(tabs)'
      screenOptions={{ headerShown: false }}
    />
  )
}
