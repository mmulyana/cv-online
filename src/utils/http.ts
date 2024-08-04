import axios from 'axios'
import { CookieKeys, CookieStorage } from './cookie'

const http = axios.create({
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
})

http.interceptors.request.use(
  (config: any) => {
    const token = CookieStorage.get(CookieKeys.AuthToken)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ''}`,
      'Content-Type': 'application/json'
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
