import { createSlice } from '@reduxjs/toolkit'
import { storeCommonActions, type InitialState } from '../utils'
import type { IMovie } from '../../interfaces/movie'
import { moviesThunkActions } from '../thunk-actions/movies'
import { ADDFAVORITES, FAVORITES, NOWPLAYING } from '../../constants/thunk-actions'
import { PURGE } from 'redux-persist'
import utils from '../../services/utils'

interface State extends InitialState {
  movies: IMovie[]
  favorites: IMovie[]
}
const initialState: State = {
  movies: [],
  favorites: [],
  isLoading: false,
  updatingId: []
}

export const moviesSlice = createSlice({
  initialState,
  name: 'moviesSlice',
  reducers: {},
  extraReducers: ({ addCase }) => {
    // clear on logout (persit store)
    addCase(PURGE, (state) => {
      state.favorites = []
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
      storeCommonActions.pushLoadingId(state, `${action.meta.arg.movie.id}`)
    })
    addCase(moviesThunkActions.addFavorites.fulfilled, (state, action) => {
      const { movie, favorite } = action.meta.arg

      if (favorite) state.favorites.push(movie)
      else {
        const index = state.favorites.findIndex(({ id }) => movie.id === id)
        if (index > -1) state.favorites.splice(index, 1)
      }

      storeCommonActions.removeLoadingId(state, `${movie.id}`)
    })
    addCase(moviesThunkActions.addFavorites.rejected, (state, action) => {
      storeCommonActions.removeLoadingId(state, `${action.meta.arg.movie.id}`)
    })
  }
})

export const moviesReducer = moviesSlice.reducer
export const moviesSliceActions = moviesSlice.actions
