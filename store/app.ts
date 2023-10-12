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
