import type { IMovie } from '../interfaces/movie'
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

  nowPlaying = async () => {
    const req = await this.httpClient.get('/movie/now_playing?language=en-US&page=1')
    return req.data.results as IMovie[] || []
  }

  recommendations = async (id: number) => {
    const req = await this.httpClient.get(`/movie/${id}/recommendations?language=en-US&page=1`)
    return req.data.results as IMovie[] || []
  }

  favorites = async (sessionId: number) => {
    const req = await this.httpClient.get(`/account/${sessionId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`)
    return req.data.results as IMovie[] || []
  }

  addFavorite = async (sessionId: string, movie: IMovie) => {
    await this.httpClient.post(
        `/account/${sessionId}/favorite`,
        {
          media_type: 'movie',
          media_id: movie.id,
          favorite: true
        }
    )

    return 'ok'
  }
}

export const moviesServices = new MoviesServices()
