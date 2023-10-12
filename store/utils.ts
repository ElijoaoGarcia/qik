import type { RootState } from './app'

export interface InitialState {
  isLoading: boolean
  updatingId: string[]
}

const pushLoadingId = (state: InitialState, id: string): void => {
  state.isLoading = true
  if (!state.updatingId.includes(id)) {
    state.updatingId.push(id)
  }
}

const removeLoadingId = (state: InitialState, id: string): void => {
  if (state.updatingId.includes(id)) {
    state.updatingId = state.updatingId.filter((idToFilter) => idToFilter !== id)
  }
  stopLoading(state)
}

const stopLoading = (state: InitialState): void => {
  if (state.updatingId.length === 0) {
    state.isLoading = false
  } else if (state.updatingId.length < 2) {
    state.isLoading = false
  }
}

export const selectAuth = (state: RootState) => state.authReducer
export const selectMovies = (state: RootState) => state.moviesReducer

export const storeCommonActions = {
  pushLoadingId,
  removeLoadingId,
  stopLoading
}
