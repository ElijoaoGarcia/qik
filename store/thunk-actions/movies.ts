import { createAsyncThunk } from '@reduxjs/toolkit'
import { moviesServices } from '../../services/movies'
import type { IMovie } from '../../interfaces/movie'

const nowPlaying = createAsyncThunk(
  'movies/nowPlaying',
  async () => {
    const movies = await moviesServices.nowPlaying()
    return movies
  }
)

const recommendations = createAsyncThunk(
  'movies/recommendations',
  async (id: number) => {
    const movies = await moviesServices.recommendations(id)
    return movies
  }
)

const favorites = createAsyncThunk(
  'movies/favorites',
  async (sessionId: string) => {
    const movies = await moviesServices.favorites(sessionId)
    return movies
  }
)

const addFavorites = createAsyncThunk(
  'movies/addFavorites',
  async ({ sessionId, movie, favorite }: { sessionId: string, movie: IMovie, favorite: boolean }) => {
    const result = await moviesServices.addFavorite(sessionId, movie, favorite)
    return result
  }
)

const credits = createAsyncThunk(
  'movie/credits',
  async (movie: IMovie) => {
    const credits = await moviesServices.credits(movie)
    return credits
  }
)

export const moviesThunkActions = {
  nowPlaying,
  recommendations,
  favorites,
  addFavorites,
  credits
}
