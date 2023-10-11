import { type FC } from 'react'
import { StyleSheet, View, Image } from 'react-native'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultImage = require('../assets/images/user.png')

interface Props {
  size?: number
  uri?: string
  style?: View['props']['style']
  noBorderRaduis?: boolean
}

const Avatar: FC<Props> = ({ size = 130, uri, style, noBorderRaduis = false }) => {
  return (
    <View style={[
      {
        width: size,
        height: size,
        borderRadius: noBorderRaduis ? 0 : size
      },
      style
    ]}>
      <Image
        source={uri ? { uri } : defaultImage}
        style={[styles.image, { borderRadius: noBorderRaduis ? 0 : size }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover'
  }
})

export default Avatar
