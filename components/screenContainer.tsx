import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  type View as DView
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors } from '../hooks'
import { View } from './Themed'
import { type FC, type ReactNode } from 'react'

interface ScreenContainerProps {
  children: DView['props']['children']
  style?: DView['props']['style']
  disableSafeArea?: boolean
  modal?: boolean
  noPaddingBottom?: boolean
}

interface DisableSafeAreaProps {
  disable?: boolean
  modal?: boolean
  children: ReactNode
}
const DisableSafeArea: FC<DisableSafeAreaProps> = ({
  children,
  modal = false,
  disable = false
}) => {
  const color = useColors()
  const styleContainer = { flex: 1, backgroundColor: color.background }

  if (disable) {
    return (
      <View style={styleContainer}>
        {children}
      </View>
    )
  }

  return (
    <SafeAreaView
      edges={modal ? ['bottom'] : undefined}
      style={styleContainer}
    >
      {children}
    </SafeAreaView>
  )
}

export const ScreenContainer: FC<ScreenContainerProps> = ({
  children, style,
  disableSafeArea,
  modal, noPaddingBottom = false
}) => {
  const color = useColors()
  const safeAreaInsets = useSafeAreaInsets()

  const isIos = Platform.OS === 'ios'
  const isAndroid = Platform.OS === 'android'

  const offSet = () => {
    const { bottom } = safeAreaInsets

    if (!modal) {
      if (isIos) {
        if (bottom === 0) return noPaddingBottom ? 15 : 30
        return noPaddingBottom ? 40 : 60
      }
      return 0
    }

    if (isIos) {
      if (bottom === 0) return 50
      return 70
    }

    return 0
  }

  return (
    <DisableSafeArea
      modal={modal}
      disable={disableSafeArea}
    >
      <KeyboardAvoidingView
        style={[
          {
            flex: 1,
            padding: 10,
            backgroundColor: color.background,
            marginBottom: !noPaddingBottom ? (safeAreaInsets.bottom ? 0 : 10) : 0
          },
          style
        ]}
        behavior={isIos ? 'padding' : 'height'}
        keyboardVerticalOffset={offSet()}
      >

        {!disableSafeArea && isAndroid
          ? (<View style={{ height: StatusBar.currentHeight }} />)
          : null
        }

        {children}
      </KeyboardAvoidingView>
    </DisableSafeArea>
  )
}

export default ScreenContainer
