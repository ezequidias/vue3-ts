import { getToken, setToken } from '@/utils/AuthService'
import axios from 'axios'

// Create axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Request intercepter
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) config.headers['Authorization'] = `Bearer ${  getToken()}` // Set JWT token
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response pre-processing
service.interceptors.response.use(
  response => {
    if (response.headers.authorization) {
      setToken(response.headers.authorization)
      response.data.token = response.headers.authorization
    }
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
