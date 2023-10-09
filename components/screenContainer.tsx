import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  type View as DView
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors } from '../hooks'
import { View } from './Themed'

interface ScreenContainerProps {
  children: DView['props']['children']
  style?: DView['props']['style']
  disableSafeArea?: boolean
  modal?: boolean
  noPaddingBottom?: boolean
}

export const ScreenContainer = ({
  children, style,
  disableSafeArea,
  modal, noPaddingBottom = false
}: ScreenContainerProps) => {
  const color = useColors()
  const safeAreaInsets = useSafeAreaInsets()

  const isIos = Platform.OS === 'ios'

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
    <SafeAreaView edges={modal ? ['bottom'] : undefined} style={{ flex: 1, backgroundColor: color.background }}>
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

            {!disableSafeArea && !isIos
              ? (<View style={{ height: StatusBar.currentHeight }} />)
              : null
            }

            {children}
            {/* <View /> */}
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ScreenContainer
