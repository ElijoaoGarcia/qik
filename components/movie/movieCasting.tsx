import { useEffect, useState, memo } from 'react'
import { Text, View } from '../Themed'
import { type IMovie } from '../../interfaces/movie'
import { moviesServices } from '../../services/movies'
import { StyleSheet } from 'react-native'
import { Spinner } from '@ui-kitten/components'
import { useAppDispatch, useAppSelector, useColors } from '../../hooks'
import { selectMovies } from '../../store/utils'
import { moviesSliceActions } from '../../store/slices/movies'

interface MovieCastingProps {
  movie: IMovie
}

export const MovieCasting = memo(function MovieCasting ({ movie }: MovieCastingProps) {
  const colors = useColors()
  const dispatch = useAppDispatch()
  const { movies } = useAppSelector(selectMovies)

  const [isLoading, setIsLoading] = useState(true)
  // const [data, setData] = useState<IMovieCredits[]>([])

  const data = movies.find(({ id }) => id === movie.id)?.cast ?? []
  const filteredCasting = data.filter(
    ({ known_for_department }) => known_for_department === 'Acting'
  )

  const noContent = !isLoading && !data.length
  const showContent = !isLoading && data.length > 0

  const fetchCredits = async () => {
    try {
      if (data.length > 0) return

      const credits = await moviesServices.credits(movie)
      if (credits.length > 0) {
        dispatch(moviesSliceActions.setCast({
          movieId: movie.id,
          cast: credits
        }))
      }
    } catch (error) {
      alert('Algo salio mal, por favor intentalo nuevamente')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchCredits()
  }, [movie])

  return (
    <View style={[styles.container, { backgroundColor: colors.infoBg }]}>
      {isLoading ? <Spinner /> : null}
      {noContent
        ? <Text>Casting no disponible</Text>
        : null
      }
      {showContent ? <Text style={styles.title}>Actores</Text> : null}
      {showContent
        ? (filteredCasting.map((cast) => (<Text key={cast.id} style={styles.content}>
          {cast.original_name} ({cast.character})
        </Text>)))
        : null
      }
    </View>
  )
})

MovieCasting.displayName = 'MovieCasting'

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
