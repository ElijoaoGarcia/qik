import { type FC } from 'react'
import { type IMovie } from '../../interfaces/movie'
import { Text, View } from '../Themed'
import { Pressable, StyleSheet } from 'react-native'
import { HeartIcon } from '../icons'
import { useAppDispatch, useAppSelector, useColors, useSession } from '../../hooks'
import Avatar from '../avatar'
import env from '../../env'
import { selectMovies } from '../../store/utils'
import { moviesThunkActions } from '../../store/thunk-actions/movies'
import { Spinner } from '@ui-kitten/components'

interface MovieCardProps {
  movie: IMovie
  onHitFavorite: (movie: IMovie) => void
  isFavorite: boolean
  isLoading?: boolean
}

const Card: FC<MovieCardProps> = ({ movie, onHitFavorite, isFavorite, isLoading }) => {
  const colors = useColors()
  const [year] = movie.release_date.split('-')

  return (
    <View style={styles.container}>
      <Avatar
        noBorderRaduis
        uri={env.apiImageBucketUrl + movie.poster_path}
        style={styles.avatar}
      />

      <View style={[styles.content, { backgroundColor: colors.transparentBg }]}>
        <View style={{ backgroundColor: 'transparent', flex: 1 }}>
          <Text style={styles.title}>{movie.original_title} ({year})</Text>
          <Text>Puntuaje: {movie.vote_average}/10</Text>
        </View>

        <View style={{ backgroundColor: 'transparent' }}>
          <Pressable
            style={styles.favorite}
            onPress={() => onHitFavorite(movie)}
          >
            {isLoading
              ? <Spinner />
              : (<HeartIcon size={35} color={isFavorite ? 'red' : colors.text} />)
            }
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export const MovieCard: FC<Pick<MovieCardProps, 'movie'>> = ({ movie }) => {
  const dispatch = useAppDispatch()
  const { sessionId } = useSession()
  const { isLoading, updatingId, favorites } = useAppSelector(selectMovies)

  const isThisLoading = isLoading && updatingId.includes(`${movie.id}`)
  const isFavorite = (movie: IMovie) => favorites.some(({ id }) => movie.id === id)
  const addFavorite = async (movie: IMovie) => {
    const favorite = !isFavorite(movie)

    void dispatch(moviesThunkActions.addFavorites({ movie, sessionId, favorite }))
  }

  return (
    <Card
      movie={movie}
      isFavorite={isFavorite(movie)}
      onHitFavorite={addFavorite}
      isLoading={isThisLoading}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10
  },
  avatar: {
    width: '100%',
    height: 250
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 22,
    backgroundColor: 'transparent'
  },
  favorite: {
    padding: 5
  }
  // avatar: {}
})
