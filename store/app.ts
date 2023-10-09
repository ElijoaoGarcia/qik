import asyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import { authReducer } from './slices/auth'
import { moviesReducer } from './slices/movies'

const rootReducers = combineReducers({
  authReducer,
  moviesReducer
})

const config = {
  key: 'root',
  storage: asyncStorage
}

const persistedReducer = persistReducer(config, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducers>
export type AppDispatch = typeof store.dispatch
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

export const storeCommonActions = {
  pushLoadingId,
  removeLoadingId,
  stopLoading
}
