import { StyleSheet } from 'react-native'
import { Text, View } from '../../../components/Themed'
import { useSession } from '../../../hooks'
import { ScreenContainer } from '../../../components/screenContainer'

export default function TabOneScreen () {
  const { profile, sessionId } = useSession()

  return (
    <ScreenContainer>
      <Text style={styles.title}>{profile.username}</Text>
      <Text style={styles.title}>{sessionId}</Text>
      <View style={styles.separator}/>
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
