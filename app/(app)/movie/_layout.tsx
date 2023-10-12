import { Stack } from 'expo-router'

export default function RootLayout () {
  return (
    <Stack
      initialRouteName='[movieId]'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='[movieId]'
        getId={({ params }) => params?.movieId }
        options={{ presentation: 'card' }}
      />
    </Stack>
  )
}
