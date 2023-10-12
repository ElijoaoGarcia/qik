import { Tabs } from 'expo-router'
import { HomeIcon, PersonIcon } from '../../../components/icons'
import { useColors } from '../../../hooks'

export default function TabLayout () {
  const colors = useColors()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tint,
        tabBarLabel: () => null
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <PersonIcon color={color} />
        }}
      />
    </Tabs>
  )
}
