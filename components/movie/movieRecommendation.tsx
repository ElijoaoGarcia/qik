import { useEffect, useState, memo } from 'react'
import { Text, View } from '../Themed'
import type { IMovie } from '../../interfaces/movie'
import { StyleSheet } from 'react-native'
import { List, Spinner } from '@ui-kitten/components'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { MovieCard } from './movieCard'
import { selectMovies } from '../../store/utils'
import { moviesThunkActions } from '../../store/thunk-actions/movies'
import { router } from 'expo-router'

interface MovieRecommendationProps {
  movie: IMovie
}

export const MovieRecommendation = memo(function MovieRecommendation ({ movie }: MovieRecommendationProps) {
  const dispatch = useAppDispatch()
  const { movies } = useAppSelector(selectMovies)
  const [isLoading, setIsLoading] = useState(true)

  const data = movies.find(({ id }) => id === movie.id)?.recommendations ?? []

  const noContent = !isLoading && !data.length
  const showContent = !isLoading && data.length > 0

  const fetchRecommendatios = async () => {
    try {
      if (data.length > 0) return

      await dispatch(moviesThunkActions.recommendations(movie.id))
    } catch (error) {
      alert('Algo salio mal, por favor intentalo nuevamente')
    } finally {
      setIsLoading(false)
    }
  }

  const goTo = (movie: IMovie) => {
    router.push(`/movie/${movie.id}`)
  }

  useEffect(() => {
    void fetchRecommendatios()
  }, [movie])

  if (noContent) return null

  return (
    <View style={styles.container}>
      {isLoading ? <Spinner /> : null}
      {showContent ? <Text style={styles.title}>Recomendaciones</Text> : null}
      {showContent
        ? (
          <List
            horizontal
            alwaysBounceHorizontal
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            data={data}
            renderItem={({ item }) => (
              <MovieCard
                key={item.id}
                recommendation
                movie={item}
                onSelect={goTo}
              />
            )}
          />)
        : null
      }
    </View>
  )
})

MovieRecommendation.displayName = 'MovieRecommendation'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 7
  },
  content: {
    marginTop: 1,
    fontSize: 17
  }
})
