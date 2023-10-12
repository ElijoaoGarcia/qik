import { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { List, Spinner } from '@ui-kitten/components'
import { Text, View } from '../../../components/Themed'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { ScreenContainer } from '../../../components/screenContainer'
import { selectMovies } from '../../../store/utils'
import { moviesThunkActions } from '../../../store/thunk-actions/movies'
import { NOWPLAYING } from '../../../constants/thunk-actions'
import { MovieCard } from '../../../components/movie/movieCard'
import { RefreshIcon } from '../../../components/icons'
import type { IMovie } from '../../../interfaces/movie'

export default function Home () {
  const dispatch = useAppDispatch()
  const { movies, isLoading, updatingId } = useAppSelector(selectMovies)

  const fetchMovies = async () => await dispatch(moviesThunkActions.nowPlaying())

  const isFetchingMovies = isLoading && updatingId.includes(NOWPLAYING)
  const canShowMovies = movies.length > 0

  const onSelectMovie = (movie: IMovie) => router.push(`/movie/${movie.id}`)

  useEffect(() => {
    void fetchMovies()
    // void fetchFavoritesMovies()
  }, [])

  return (
    <ScreenContainer style={styles.container}>
      { isFetchingMovies && !canShowMovies ? (<Spinner />) : null }

      { canShowMovies
        ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Peliculas
            </Text>

            <Pressable onPress={fetchMovies}>
              {isFetchingMovies ? <Spinner /> : <RefreshIcon />}
            </Pressable>
          </View>)
        : null }

      { canShowMovies
        ? (
          <List
            alwaysBounceVertical
            ListEmptyComponent={() => <Text style={{ textAlign: 'center' }}>No hay peliculas actualmente</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            data={movies}
            style={{ backgroundColor: 'transparent' }}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                onSelect={onSelectMovie}
              />
            )}
          />)
        : null }
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginVertical: 15
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
