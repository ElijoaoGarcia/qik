import { useCallback, useEffect, useMemo } from 'react'
import { ScreenContainer } from '../../../components/screenContainer'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectMovies } from '../../../store/utils'
import { View } from '../../../components/Themed'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { moviesServices } from '../../../services/movies'
import { MovieCard } from '../../../components/movie/movieCard'
import { Pressable, ScrollView, StyleSheet } from 'react-native'
import { MovieCasting } from '../../../components/movie/movieCasting'
import { ArrowBackIcon } from '../../../components/icons'
import { moviesThunkActions } from '../../../store/thunk-actions/movies'
import { Spinner } from '@ui-kitten/components'
import { MovieRecommendation } from '../../../components/movie/movieRecommendation'
import { MovieDescription } from '../../../components/movie/movieDescription'
import { MovieRate } from '../../../components/movie/movieRate'

export default function Movie () {
  const dispatch = useAppDispatch()
  const { movieId } = useLocalSearchParams()
  const { movies, isLoading, updatingId } = useAppSelector(selectMovies)

  const isMovieIdString = typeof movieId === 'string'
  const isThisLoading = isLoading && isMovieIdString && updatingId.includes(movieId)

  const movie = useMemo(() => {
    return movies.find(({ id }) => isMovieIdString && `${id}` === movieId) ?? moviesServices.mockMovie()
  }, [movies, movieId])

  const fetchMovie = useCallback(async () => {
    try {
      if (movie.id !== 0 || !isMovieIdString) return

      await dispatch(moviesThunkActions.movie(movieId)).unwrap()
    } catch (error) {
      goHome()
    }
  }, [movieId])

  useEffect(() => {
    void fetchMovie()
  }, [])

  const goHome = () => router.canGoBack()
    ? router.back()
    : router.replace('/')

  if (isThisLoading) {
    return (
      <ScreenContainer>
        <Stack.Screen
          options={{
            presentation: 'card',
            headerTitle: 'Cargando...',
            headerShown: true,
            headerLeft: () => (
              <Pressable onPress={goHome}>
                <ArrowBackIcon />
              </Pressable>
            )
          }}
        />
        <View style={styles.spinnerContainer}>
          <Spinner />
        </View>
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer modal>
      <Stack.Screen
        options={{
          headerTitle: movie.original_title,
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={goHome}>
              <ArrowBackIcon />
            </Pressable>
          )
        }}
      />

      <ScrollView>
        <MovieCard expanded={true} movie={movie} />
        <MovieRate movie={movie} />
        <MovieDescription movie={movie} />
        <MovieCasting movie={movie} />
        <MovieRecommendation movie={movie} />
      </ScrollView>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  spinnerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})
