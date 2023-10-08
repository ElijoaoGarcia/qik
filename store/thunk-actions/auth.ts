import { createAsyncThunk } from '@reduxjs/toolkit'
import { authServices } from '../../services/auth'

const signin = createAsyncThunk(
  'auth/signin',
  async ({ username, password }: { username: string, password: string }, { dispatch }) => {
    const sessionId = await authServices.signin(username, password)
    return sessionId
  }
)

const profile = createAsyncThunk(
  'auth/profile',
  async (sessionId: string) => {
    const profile = await authServices.profile(sessionId)
    return profile
  }
)

export const authThunkActions = {
  signin,
  profile
}
