import type { IMovie, IMovieCredits } from '../interfaces/movie'
import { RequestSource } from './request-source'

class MoviesServices extends RequestSource {
  mockMovie = (): IMovie => ({
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0, // 0> 10
    vote_count: 0,
    belongs_to_collection: null,
    budget: 0,
    genres: [],
    homepage: '',
    imdb_id: '',
    production_companies: [],
    production_countries: [],
    revenue: '',
    runtime: '',
    spoken_languages: [],
    status: '',
    tagline: ''
  })

  nowPlaying = async (): Promise<IMovie[]> => {
    const req = await this.httpClient.get('/movie/now_playing?language=en-US&page=1')
    return req.data.results || []
  }

  movie = async (movieId: string): Promise<IMovie> => {
    const req = await this.httpClient.get(`/movie/${movieId}`)
    return req.data
  }

  recommendations = async (movieId: number): Promise<IMovie[]> => {
    const req = await this.httpClient.get(`/movie/${movieId}/recommendations?language=en-US&page=1`)
    return req.data.results || []
  }

  favorites = async (sessionId: string): Promise<IMovie[]> => {
    const req = await this.httpClient.get(`/account/${sessionId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`)
    return req.data.results || []
  }

  addFavorite = async (sessionId: string, movie: IMovie, favorite: boolean) => {
    await this.httpClient.post(
      `/account/${sessionId}/favorite`,
      {
        favorite,
        media_type: 'movie',
        media_id: movie.id
      }
    )

    return 'ok'
  }

  credits = async (movie: IMovie): Promise<IMovieCredits[]> => {
    if (movie.id === 0) return []

    const req = await this.httpClient.get(`/movie/${movie.id}/credits`)
    return req.data.cast || []
  }

  rated = async (sessionId: string): Promise<IMovie[]> => {
    const req = await this.httpClient.get(`/account/${sessionId}/rated/movies`)
    return req.data.results || []
  }

  addRate = async (movie: IMovie, value: number) => {
    await this.httpClient.post(
      `/movie/${movie.id}/rating`,
      { value }
    )

    return 'ok'
  }

  removeRating = async (movie: IMovie) => {
    await this.httpClient.delete(`/movie/${movie.id}/rating`)
    return 'ok'
  }
}

export const moviesServices = new MoviesServices()
