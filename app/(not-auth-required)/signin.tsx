import { useRef, useState } from 'react'
import { Stack, router } from 'expo-router'
import { View, Text } from '../../components/Themed'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Input, Button } from '@ui-kitten/components'
import { useAppDispatch, useColors, useSession } from '../../hooks'
import { authThunkActions } from '../../store/thunk-actions/auth'
import { ScreenContainer } from '../../components/screenContainer'
import utils from '../../services/utils'

export default function signin () {
  const dispatch = useAppDispatch()
  const colors = useColors()
  const { isLoading } = useSession()
  const [data, setData] = useState({ username: '', password: '' })

  const passwordRef = useRef<Input>(null)

  const inputHandler = (t: keyof typeof data) => (value: string) => {
    setData((prev) => ({ ...prev, [t]: value }))
  }

  const canContinue = () => {
    if (
      !data.username ||
      !data.password ||
      !utils.whiteSpaceChecker(data.username) ||
      !utils.whiteSpaceChecker(data.password)
    ) return false

    return true
  }

  const onSubmit = async (): Promise<void> => {
    try {
      if (isLoading) return

      if (canContinue()) return alert('Por favor completa todos los campos')

      const signin = await dispatch(authThunkActions.signin(data)).unwrap()
      void dispatch(authThunkActions.profile(signin))

      router.replace('/')
    } catch (error) {
      alert('Credenciales incorrectas')
    }
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <Text style={styles.title}>
          Iniciar Sesión
        </Text>

        <Text style={[styles.description, { backgroundColor: colors.infoBg }]}>
          Utiliza tu cuenta de TMDB para acceder.
        </Text>

        <View style={styles.form}>
          <Input
            autoFocus
            style={styles.input}
            placeholder='Nombre de usuario'
            value={data.username}
            onChangeText={inputHandler('username')}
            onSubmitEditing={() => passwordRef.current?.focus()}
          />

          <Input
            secureTextEntry
            style={styles.input}
            ref={passwordRef}
            placeholder='Contraseña'
            value={data.password}
            onChangeText={inputHandler('password')}
            onSubmitEditing={onSubmit}
          />

          <Button
            disabled={isLoading}
            onPress={onSubmit}
            size='large'
          >
            {isLoading ? <ActivityIndicator /> : 'Continuar'}
          </Button>
        </View>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 15
  },
  title: {
    fontSize: 25
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    maxWidth: 280
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    maxWidth: 250
  },
  input: {
    width: '100%'
  }
})
