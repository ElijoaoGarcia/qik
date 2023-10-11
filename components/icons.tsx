import type { FC } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useColors } from '../hooks'

interface IconProps {
  size?: number
  color?: string
}

export const PersonIcon: FC<IconProps> = ({ size = 24, color }) => {
  const colors = useColors()

  return (
    <Ionicons name="person" size={size} color={color ?? colors.text} />
  )
}

export const HomeIcon: FC<IconProps> = ({ size = 24, color }) => {
  const colors = useColors()

  return (
    <Ionicons name="home" size={size} color={color ?? colors.text} />
  )
}

export const HeartIcon: FC<IconProps> = ({ size = 24, color }) => {
  const colors = useColors()

  return (
    <Ionicons name="heart" size={size} color={color ?? colors.text} />
  )
}

export const RefreshIcon: FC<IconProps> = ({ size = 24, color }) => {
  const colors = useColors()

  return (
    <Ionicons name="refresh" size={size} color={color ?? colors.text} />
  )
}
