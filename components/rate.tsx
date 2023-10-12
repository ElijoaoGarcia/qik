import { memo } from 'react'
import { View } from './Themed'
import { Pressable, StyleSheet } from 'react-native'
import { StarIcon, StarOutlineIcon } from './icons'

interface RateProps {
  rating: number // 0 -> 10
  onSelect: (index: number) => void
  size?: number
  starAmount?: number
}
export const Rate = memo(function Rate ({
  rating, size, onSelect,
  starAmount = 5
}: RateProps) {
  const ratingStar = []

  for (let i = 1; i <= starAmount; i++) {
    ratingStar.push(
      i <= rating
        ? <StarIcon color='#E9E20F' size={size} />
        : <StarOutlineIcon size={size} />
    )
  }

  return (
    <View style={styles.container}>
      {ratingStar.map((star, i) => (
        <Pressable key={i} onPress={() => onSelect(i + 1)}>
          {star}
        </Pressable>
      ))}
    </View>
  )
})

Rate.displayName = 'Rate'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3
  }
})
