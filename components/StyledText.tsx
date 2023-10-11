import type { FC } from 'react'
import { Text, type DefaultText } from './Themed'

export const MonoText: FC<DefaultText['props']> = ({ style, ...props }) => {
  return (
    <Text
      {...props}
      style={[style, { fontFamily: 'SpaceMono' }]}
    />
  )
}
