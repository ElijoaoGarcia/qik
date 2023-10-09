import { createSlice } from '@reduxjs/toolkit'
import { storeCommonActions, type InitialState, type RootState } from '../app'
import type { IMovie } from '../../interfaces/movie'
import { moviesThunkActions } from '../thunk-actions/movies'
import { favorites, nowPlaying } from '../../constants/thunk-actions'
import { PURGE } from 'redux-persist'

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
      storeCommonActions.pushLoadingId(state, nowPlaying)
    })
    addCase(moviesThunkActions.nowPlaying.fulfilled, (state, action) => {
      state.movies = action.payload
      storeCommonActions.removeLoadingId(state, nowPlaying)
    })
    addCase(moviesThunkActions.nowPlaying.rejected, (state) => {
      storeCommonActions.removeLoadingId(state, nowPlaying)
    })

    // handling favorites
    addCase(moviesThunkActions.favorites.pending, (state) => {
      storeCommonActions.pushLoadingId(state, favorites)
    })
    addCase(moviesThunkActions.favorites.fulfilled, (state, action) => {
      state.favorites = action.payload
      storeCommonActions.removeLoadingId(state, favorites)
    })
    addCase(moviesThunkActions.favorites.rejected, (state) => {
      storeCommonActions.removeLoadingId(state, favorites)
    })
  }
})

export const moviesReducer = moviesSlice.reducer
export const moviesSliceActions = moviesSlice.actions
export const selectMovies = (state: RootState) => state.moviesReducer
