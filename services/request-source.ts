import axios from 'axios'
import env from '../env'

axios.defaults.baseURL = env.apiBaseUrl
axios.defaults.headers.common.Authorization = `Bearer ${env.apiToken}`
axios.defaults.withCredentials = false
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.common.Accept = 'application/json'

export class RequestSource {
  protected readonly httpClient = axios
}
