import { StyleSheet } from 'react-native'
import { Text, View } from '../../../components/Themed'
import { ScreenContainer } from '../../../components/screenContainer'
import { Avatar, Button } from '@ui-kitten/components'
import { useSession } from '../../../hooks'
import { persistor } from '../../../store/app'

export default function TabTwoScreen () {
  const { profile } = useSession()

  const hasAvatar = !!profile.avatar.tmdb.avatar_path
  const name = profile.name || profile.username

  const signout = async () => {
    try {
      await persistor.purge()
    } catch (error) {
      alert('Algo salio mal, por favor intentalo nuevamente.')
    }
  }

  return (
    <ScreenContainer style={{ padding: 10 }}>
      <View style={styles.container}>
        { hasAvatar
          ? (
            <Avatar
              // style={styles.avatar}
              size='giant'
              source={{ uri: profile.avatar.tmdb.avatar_path ?? '' }}
            />)
          : null
        }

        <Text style={styles.title}>Hola {name}</Text>
      </View>

      <Button onPress={signout}>Salir</Button>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
