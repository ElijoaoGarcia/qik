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
  async (sessionId: number) => {
    const movies = await moviesServices.favorites(sessionId)
    return movies
  }
)

const addFavorites = createAsyncThunk(
  'movies/addFavorites',
  async ({ sessionId, movie }: { sessionId: string, movie: IMovie }) => {
    const result = await moviesServices.addFavorite(sessionId, movie)
    return result
  }
)

export const moviesThunkActions = {
  nowPlaying,
  recommendations,
  favorites,
  addFavorites
}
