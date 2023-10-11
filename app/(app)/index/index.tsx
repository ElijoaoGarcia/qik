import { Pressable, StyleSheet } from 'react-native'
import { Text, View } from '../../../components/Themed'
import { useAppDispatch, useAppSelector, useSession } from '../../../hooks'
import { ScreenContainer } from '../../../components/screenContainer'
import { List, Spinner } from '@ui-kitten/components'
import { selectMovies } from '../../../store/utils'
import { moviesThunkActions } from '../../../store/thunk-actions/movies'
import { useEffect } from 'react'
import { NOWPLAYING } from '../../../constants/thunk-actions'
import { MovieCard } from '../../../components/movie/movieCard'
import { RefreshIcon } from '../../../components/icons'

export default function TabOneScreen () {
  const dispatch = useAppDispatch()
  const { sessionId } = useSession()
  const { movies, isLoading, updatingId } = useAppSelector(selectMovies)

  const fetchMovies = async () => await dispatch(moviesThunkActions.nowPlaying())
  const fetchFavoritesMovies = async () => await dispatch(moviesThunkActions.favorites(sessionId))

  const isFetchingMovies = isLoading && updatingId.includes(NOWPLAYING)
  const canShowMovies = movies.length > 0

  useEffect(() => {
    void fetchMovies()
    void fetchFavoritesMovies()
  }, [])

  return (
    <ScreenContainer style={styles.container}>
      { isFetchingMovies && !canShowMovies ? (<Spinner />) : null }

      {canShowMovies
        ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Peliculas
            </Text>

            <Pressable onPress={fetchMovies}>
              {isFetchingMovies ? <Spinner /> : <RefreshIcon />}
            </Pressable>
          </View>)
        : null}
      {canShowMovies
        ? (
          <List
            data={movies}
            style={{ backgroundColor: 'transparent' }}
            renderItem={({ item }) => (
              <MovieCard
                key={item.id}
                movie={item}
              />
            )}
          />)
        : null}
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
