import { Redirect, Stack } from 'expo-router'
import { useCheckSession } from '../../hooks'

export default function RootLayout () {
  const hasSession = useCheckSession()

  if (!hasSession) return <Redirect href='/signin' />

  return <Stack screenOptions={{ headerShown: false }} />
}
