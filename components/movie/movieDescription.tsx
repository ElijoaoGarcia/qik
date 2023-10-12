import React, { memo } from 'react'
import { type IMovie } from '../../interfaces/movie'
import { StyleSheet } from 'react-native'
import { View, Text } from '../Themed'
import { useColors } from '../../hooks'

interface MovieDescriptionProps {
  movie: IMovie
}
export const MovieDescription = memo(function MovieDescription ({ movie }: MovieDescriptionProps) {
  const colors = useColors()

  return (
    <View style={[styles.container, { backgroundColor: colors.infoBg }]}>
      <Text
        style={styles.title}
      >
          Descripción
      </Text>

      <Text style={styles.content}>
        {movie.overview}
      </Text>
    </View>
  )
})

MovieDescription.displayName = 'MovieDescription'

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
    marginTop: 8,
    fontSize: 17
  }
})
