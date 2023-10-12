import { List } from '@ui-kitten/components'
import { View, Text } from '../../components/Themed'
import { useAppSelector } from '../../hooks'
import { selectMovies } from '../../store/utils'
import { MovieCard } from '../../components/movie/movieCard'
import { ScrollView } from 'react-native-gesture-handler'
import { Stack, router } from 'expo-router'
import { Pressable } from 'react-native'
import { ArrowBackIcon } from '../../components/icons'
import { ScreenContainer } from '../../components/screenContainer'
import { type IMovie } from '../../interfaces/movie'

export default function Favorites () {
  const { favorites } = useAppSelector(selectMovies)

  const goTo = (movie: IMovie) => router.push(`/movie/${movie.id}`)

  return (
    <ScreenContainer modal>
      <Stack.Screen
        options={{
          headerTitle: 'Peliculas favoritas',
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <ArrowBackIcon />
            </Pressable>
          )
        }}
      />

      <ScrollView>
        <List
          alwaysBounceVertical
          ListEmptyComponent={() => <Text style={{ textAlign: 'center' }}>No hay peliculas actualmente</Text>}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          data={favorites}
          style={{ backgroundColor: 'transparent' }}
          renderItem={({ item }) => (<MovieCard movie={item} onSelect={goTo} />)}
        />
      </ScrollView>
    </ScreenContainer>
  )
}
