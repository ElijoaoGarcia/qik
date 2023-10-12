import { memo } from 'react'
import { Text, View } from '../Themed'
import { StyleSheet } from 'react-native'
import { Rate } from '../rate'
import { type IMovie } from '../../interfaces/movie'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectMovies } from '../../store/utils'
import { moviesThunkActions } from '../../store/thunk-actions/movies'
import { RATING } from '../../constants/thunk-actions'
import { Spinner } from '@ui-kitten/components'

interface MovieRateProps {
  movie: IMovie
}
export const MovieRate = memo(function MovieRate ({ movie }: MovieRateProps) {
  const dispatch = useAppDispatch()
  const { rated: movies, isLoading, updatingId } = useAppSelector(selectMovies)

  const rated = movies.find(({ id }) => id === movie.id)
  const isRated = !!rated

  const isThisLoading = isLoading && updatingId.includes(`${RATING}-${movie.id}`)

  const rateMovie = async (value: number) => {
    if (isRated && rated.rating === value * 2) {
      void dispatch(moviesThunkActions.removeRating(movie))
      return
    }

    void dispatch(moviesThunkActions.addRate({ movie, rate: value * 2 }))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Votar
      </Text>

      <View style={styles.content}>

        {!isThisLoading
          ? <Rate
            size={30}
            rating={isRated && rated?.rating
              ? rated.rating / 2
              : 0
            }
            onSelect={rateMovie}
          />
          : <Spinner /> }
      </View>
    </View>
  )
})

MovieRate.displayName = 'MovieRate'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 25,
    fontWeight: '500'
  },
  content: {
    marginVertical: 10
  }
})
