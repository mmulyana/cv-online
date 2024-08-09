const development = import.meta.env.MODE == 'development'

export const BASE_URL = development
  ? 'http://localhost:5173'
  : window.location.origin
