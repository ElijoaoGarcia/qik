import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { storeCommonActions, type InitialState } from '../utils'
import type { IMovie, IMovieCredits } from '../../interfaces/movie'
import { moviesThunkActions } from '../thunk-actions/movies'
import { CASTING, FAVORITES, NOWPLAYING, RATING, RECOMMENDATIONS } from '../../constants/thunk-actions'
import { PURGE } from 'redux-persist'
import utils from '../../services/utils'

interface State extends InitialState {
  movies: IMovie[]
  favorites: IMovie[]
  rated: IMovie[]
}
const initialState: State = {
  movies: [],
  favorites: [],
  rated: [],
  isLoading: false,
  updatingId: []
}

export const moviesSlice = createSlice({
  initialState,
  name: 'moviesSlice',
  reducers: {
    setCast: (state, action: PayloadAction<{ movieId: number, cast: IMovieCredits[] }>) => {
      const { movieId, cast } = action.payload
      const index = state.movies.findIndex(({ id }) => id === movieId)
      if (index > -1) state.movies[index].cast = cast
    }
  },
  extraReducers: ({ addCase }) => {
    // clear on logout (persit store)
    addCase(PURGE, (state) => {
      state.favorites = []
      state.rated = []
    })

    // handling now playing
    addCase(moviesThunkActions.nowPlaying.pending, (state) => {
      storeCommonActions.pushLoadingId(state, NOWPLAYING)
    })
    addCase(moviesThunkActions.nowPlaying.fulfilled, (state, action) => {
      state.movies = utils.sortMovies(action.payload)
      storeCommonActions.removeLoadingId(state, NOWPLAYING)
    })
    addCase(moviesThunkActions.nowPlaying.rejected, (state) => {
      storeCommonActions.removeLoadingId(state, NOWPLAYING)
    })

    // handling movie
    addCase(moviesThunkActions.movie.pending, (state, action) => {
      storeCommonActions.pushLoadingId(state, `${action.meta.arg}`)
    })
    addCase(moviesThunkActions.movie.fulfilled, (state, action) => {
      const index = state.movies.findIndex(({ id }) => `${id}` === action.meta.arg)
      if (index > -1) state.movies[index] = action.payload
      else state.movies.push(action.payload)

      // state.movies = utils.sortMovies(action.payload)
      storeCommonActions.removeLoadingId(state, `${action.meta.arg}`)
    })
    addCase(moviesThunkActions.movie.rejected, (state, action) => {
      storeCommonActions.removeLoadingId(state, `${action.meta.arg}`)
    })

    // handling favorites
    addCase(moviesThunkActions.favorites.pending, (state) => {
      storeCommonActions.pushLoadingId(state, FAVORITES)
    })
    addCase(moviesThunkActions.favorites.fulfilled, (state, action) => {
      state.favorites = utils.sortMovies(action.payload)
      storeCommonActions.removeLoadingId(state, FAVORITES)
    })
    addCase(moviesThunkActions.favorites.rejected, (state) => {
      storeCommonActions.removeLoadingId(state, FAVORITES)
    })

    addCase(moviesThunkActions.addFavorites.pending, (state, action) => {
      storeCommonActions.pushLoadingId(state, `${FAVORITES}-${action.meta.arg.movie.id}`)
    })
    addCase(moviesThunkActions.addFavorites.fulfilled, (state, action) => {
      const { movie, favorite } = action.meta.arg

      if (favorite) state.favorites.push(movie)
      else {
        const index = state.favorites.findIndex(({ id }) => movie.id === id)
        if (index > -1) state.favorites.splice(index, 1)
      }

      storeCommonActions.removeLoadingId(state, `${FAVORITES}-${movie.id}`)
    })
    addCase(moviesThunkActions.addFavorites.rejected, (state, action) => {
      storeCommonActions.removeLoadingId(state, `${FAVORITES}-${action.meta.arg.movie.id}`)
    })

    // rating
    addCase(moviesThunkActions.rated.pending, (state) => {
      storeCommonActions.pushLoadingId(state, RATING)
    })
    addCase(moviesThunkActions.rated.fulfilled, (state, action) => {
      state.rated = action.payload

      storeCommonActions.removeLoadingId(state, RATING)
    })
    addCase(moviesThunkActions.rated.rejected, (state) => {
      storeCommonActions.removeLoadingId(state, RATING)
    })

    addCase(moviesThunkActions.addRate.pending, (state, action) => {
      storeCommonActions.pushLoadingId(state, `${RATING}-${action.meta.arg.movie.id}`)
    })
    addCase(moviesThunkActions.addRate.fulfilled, (state, action) => {
      const { movie, rate } = action.meta.arg

      const copiedMovie = { ...movie }
      copiedMovie.rating = rate

      const index = state.rated.findIndex(({ id }) => id === movie.id)
      if (index > -1) state.rated[index] = copiedMovie
      else state.rated.push(copiedMovie)

      storeCommonActions.removeLoadingId(state, `${RATING}-${movie.id}`)
    })
    addCase(moviesThunkActions.addRate.rejected, (state, action) => {
      storeCommonActions.removeLoadingId(state, `${RATING}-${action.meta.arg.movie.id}`)
    })

    addCase(moviesThunkActions.removeRating.pending, (state, action) => {
      storeCommonActions.pushLoadingId(state, `${RATING}-${action.meta.arg.id}`)
    })
    addCase(moviesThunkActions.removeRating.fulfilled, (state, action) => {
      const movie = action.meta.arg

      const index = state.rated.findIndex(({ id }) => id === movie.id)
      if (index > -1) state.rated.splice(index, 1)

      storeCommonActions.removeLoadingId(state, `${RATING}-${movie.id}`)
    })
    addCase(moviesThunkActions.removeRating.rejected, (state, action) => {
      storeCommonActions.removeLoadingId(state, `${RATING}-${action.meta.arg.id}`)
    })

    addCase(moviesThunkActions.credits.pending, (state) => {
      storeCommonActions.pushLoadingId(state, CASTING)
    })
    addCase(moviesThunkActions.credits.fulfilled, (state, action) => {
      const index = state.movies.findIndex(({ id }) => id === action.meta.arg.id)
      if (index > -1) state.movies[index].cast = action.payload

      storeCommonActions.removeLoadingId(state, CASTING)
    })
    addCase(moviesThunkActions.credits.rejected, (state) => {
      storeCommonActions.removeLoadingId(state, CASTING)
    })

    addCase(moviesThunkActions.recommendations.pending, (state) => {
      storeCommonActions.pushLoadingId(state, RECOMMENDATIONS)
    })
    addCase(moviesThunkActions.recommendations.fulfilled, (state, action) => {
      const index = state.movies.findIndex(({ id }) => id === action.meta.arg)
      if (index > -1) {
        state.movies[index].recommendations = action.payload.map((m) => {
          m.isRecommended = true

          return m
        })
      }

      storeCommonActions.removeLoadingId(state, RECOMMENDATIONS)
    })
    addCase(moviesThunkActions.recommendations.rejected, (state) => {
      storeCommonActions.removeLoadingId(state, RECOMMENDATIONS)
    })
  }
})

export const moviesReducer = moviesSlice.reducer
export const moviesSliceActions = moviesSlice.actions
