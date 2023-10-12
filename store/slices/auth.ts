import { createSlice } from '@reduxjs/toolkit'
import { storeCommonActions, type InitialState } from '../utils'
import type { IProfile } from '../../interfaces/profile'
import { authServices } from '../../services/auth'
import { authThunkActions } from '../thunk-actions/auth'
import { PROFILE, SIGNIN } from '../../constants/thunk-actions'
import { PURGE } from 'redux-persist'

interface state extends InitialState {
  profile: IProfile
  sessionId: string
}

const initialState: state = {
  profile: authServices.mockProfile(),
  sessionId: '',
  isLoading: false,
  updatingId: []
}

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {},
  extraReducers: ({ addCase }) => {
    // clear on logout (persit store)
    addCase(PURGE, (state) => {
      state.profile = authServices.mockProfile()
      state.sessionId = ''
    })

    addCase(authThunkActions.signin.pending, (state) => {
      storeCommonActions.pushLoadingId(state, SIGNIN)
    })
    addCase(authThunkActions.signin.fulfilled, (state, action) => {
      state.sessionId = action.payload
      storeCommonActions.removeLoadingId(state, SIGNIN)
    })
    addCase(authThunkActions.signin.rejected, (state) => {
      storeCommonActions.removeLoadingId(state, SIGNIN)
    })

    addCase(authThunkActions.profile.pending, (state) => {
      storeCommonActions.pushLoadingId(state, PROFILE)
    })
    addCase(authThunkActions.profile.fulfilled, (state, action) => {
      state.profile = action.payload
      storeCommonActions.removeLoadingId(state, PROFILE)
    })
    addCase(authThunkActions.profile.rejected, (state) => {
      storeCommonActions.removeLoadingId(state, PROFILE)
    })
  }
})

export const authReducer = authSlice.reducer
export const authSliceActions = authSlice.actions
