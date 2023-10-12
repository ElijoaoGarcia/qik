import { memo } from 'react'
import { type IMovie } from '../../interfaces/movie'
import { Text, View } from '../Themed'
import { Pressable, StyleSheet } from 'react-native'
import { HeartIcon } from '../icons'
import { useAppDispatch, useAppSelector, useColors, useSession } from '../../hooks'
import { selectMovies } from '../../store/utils'
import { moviesThunkActions } from '../../store/thunk-actions/movies'
import { Spinner } from '@ui-kitten/components'
import { Avatar } from '../avatar'
import env from '../../env'
import { FAVORITES } from '../../constants/thunk-actions'

interface MovieCardProps {
  movie: IMovie
  onHitFavorite: (movie: IMovie) => void
  isFavorite: boolean
  isLoading?: boolean
  onSelect?: (movie: IMovie) => void
  expanded?: boolean
  recommendation?: boolean
}

const Card = memo(function Card ({
  movie, onHitFavorite, isFavorite,
  isLoading, onSelect, expanded = false,
  recommendation = false
}: MovieCardProps) {
  const colors = useColors()
  const [year] = movie.release_date.split('-')

  const expandedHeight = expanded && 550
  const recommendationHeight = recommendation && 210

  const hideScore = recommendation
  const hideFavorite = recommendation

  const title = recommendation
    ? movie.original_title.substring(0, 10)
    : movie.original_title

  return (
    <Pressable onPress={() => onSelect && onSelect(movie)}>
      <View style={styles.container}>
        <Avatar
          noBorderRaduis
          uri={movie.poster_path ? env.apiImageBucketUrl + movie.poster_path : undefined}
          style={{
            height: expandedHeight || recommendationHeight || 250,
            width: recommendation ? 135 : '100%'
          }}
        />

        <View style={[styles.content, { backgroundColor: colors.transparentBg }]}>
          <View style={{ backgroundColor: 'transparent', flex: 1 }}>
            <Text style={[styles.title, { fontSize: recommendation ? 18 : 22 }]}>
              {title} ({year})
            </Text>
            {!hideScore ? (<Text>Puntuaje: {movie.vote_average}/10</Text>) : null}
          </View>

          {!hideFavorite
            ? (
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
              </View>)
            : null}
        </View>
      </View>
    </Pressable>
  )
})

Card.displayName = 'Card'

export const MovieCard = memo(function MovieCard ({
  movie, onSelect, expanded,
  recommendation
}: Pick<MovieCardProps, 'movie' | 'onSelect' | 'expanded' | 'recommendation'>) {
  const dispatch = useAppDispatch()
  const { sessionId } = useSession()
  const { isLoading, updatingId, favorites } = useAppSelector(selectMovies)

  const isThisLoading = isLoading && updatingId.includes(`${FAVORITES}-${movie.id}`)
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
      onSelect={onSelect}
      expanded={expanded}
      recommendation={recommendation}
    />
  )
})

MovieCard.displayName = 'MovieCard'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10
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
    backgroundColor: 'transparent'
  },
  favorite: {
    padding: 5
  }
  // avatar: {}
})
