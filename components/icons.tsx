import type { FC } from 'react'
import { Ionicons } from '@expo/vector-icons'

interface IconProps {
  size?: number
  color?: string
}

export const PersonIcon: FC<IconProps> = ({ size = 24, color = '#000' }) => (
    <Ionicons name="person" size={size} color={color} />
)

export const HomeIcon: FC<IconProps> = ({ size = 24, color = '#000' }) => (
    <Ionicons name="home" size={size} color={color} />
)
