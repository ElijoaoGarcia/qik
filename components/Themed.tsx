import type { FC } from 'react'
import { Text as DefaultText, View as DefaultView } from 'react-native'
import { useColors } from '../hooks'

export const Text: FC<DefaultText['props']> = ({ style, ...props }) => {
  const colors = useColors()

  return (
    <DefaultText
      {...props}
      style={[{ color: colors.text }, style]}
    />
  )
}

export const View: FC<DefaultView['props']> = ({ style, ...props }) => {
  const colors = useColors()

  return (
    <DefaultView
      {...props}
      style={[{ backgroundColor: colors.background }, style]}
    />
  )
}
