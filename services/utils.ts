import { type IMovie } from '../interfaces/movie'

const whiteSpaceChecker = (value: string): boolean => {
  if (!value) return true
  return value.trim() === ''
}

const sortMovies = (movies: IMovie[]) => movies.sort((a, b) => {
  const aTitle = a.original_title
  const bTitle = b.original_title

  if (aTitle > bTitle) return -1
  if (aTitle < bTitle) return 1

  return 0
})

export default {
  whiteSpaceChecker,
  sortMovies
}
