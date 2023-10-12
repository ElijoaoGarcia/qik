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

const movie = createAsyncThunk(
  'movies/movie',
  async (movieId: string) => {
    const movie = await moviesServices.movie(movieId)
    return movie
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

const rated = createAsyncThunk(
  'movie/rated',
  async (sessionId: string) => {
    const movies = await moviesServices.rated(sessionId)
    return movies
  }
)

const addRate = createAsyncThunk(
  'movie/addRate',
  async ({ movie, rate }: { movie: IMovie, rate: number }) => {
    const result = await moviesServices.addRate(movie, rate)
    return result
  }
)

const removeRating = createAsyncThunk(
  'movie/removeRating',
  async (movie: IMovie) => {
    const result = await moviesServices.removeRating(movie)
    return result
  }
)

export const moviesThunkActions = {
  nowPlaying,
  movie,
  recommendations,
  favorites,
  addFavorites,
  credits,
  rated,
  addRate,
  removeRating
}
