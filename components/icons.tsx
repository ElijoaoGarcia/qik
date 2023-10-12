import { cloneElement, type FC } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useColors } from '../hooks'

interface IconProps {
  size?: number
  color?: string
}

const iconGenerator = (props: (IconProps & { element: any })) => {
  const colors = useColors()

  return cloneElement(
    props.element,
    {
      color: props.color ?? colors.text,
      size: props.size
    }
  )
}

export const PersonIcon: FC<IconProps> = ({ size = 24, color }) => {
  return iconGenerator({
    element: <Ionicons name="person" />,
    size,
    color
  })
}

export const HomeIcon: FC<IconProps> = ({ size = 24, color }) => {
  return iconGenerator({
    element: <Ionicons name="home" />,
    size,
    color
  })
}

export const HeartIcon: FC<IconProps> = ({ size = 24, color }) => {
  return iconGenerator({
    element: <Ionicons name="heart" />,
    size,
    color
  })
}

export const RefreshIcon: FC<IconProps> = ({ size = 24, color }) => {
  return iconGenerator({
    element: <Ionicons name="refresh" />,
    size,
    color
  })
}

export const ArrowBackIcon: FC<IconProps> = ({ size = 24, color }) => {
  return iconGenerator({
    element: <Ionicons name="arrow-back" />,
    size,
    color
  })
}

export const StarIcon: FC<IconProps> = ({ size = 24, color }) => {
  return iconGenerator({
    element: <Ionicons name="star" />,
    size,
    color
  })
}

export const StarOutlineIcon: FC<IconProps> = ({ size = 24, color }) => {
  return iconGenerator({
    element: <Ionicons name="star-outline" />,
    size,
    color
  })
}
