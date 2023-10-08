import type { IProfile } from '../interfaces/profile'
import { RequestSource } from './request-source'

class AuthServices extends RequestSource {
  mockProfile = (): IProfile => ({
    avatar: {
      gravatar: {
        hash: ''
      },
      tmdb: {
        avatar_path: null
      }
    },
    id: 0,
    iso_639_1: '',
    iso_3166_1: '',
    name: '',
    include_adult: false,
    username: ''
  })

  protected readonly generateToken = async (): Promise<string> => {
    const req = await this.httpClient.get('/authentication/token/new')
    return req.data.request_token
  }

  signin = async (username: string, password: string): Promise<string> => {
    // generate new token before try to sing in
    const token = await this.generateToken()

    const req = await this.httpClient.post(
      '/authentication/token/validate_with_login',
      {
        username,
        password,
        request_token: token
      }
    )

    return req.data.request_token
  }

  profile = async (id: string): Promise<IProfile> => {
    const req = await this.httpClient.get(`/account/${id}`)
    return req.data
  }
}

export const authServices = new AuthServices()
