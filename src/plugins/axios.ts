import axios from 'axios';
import { useToast } from 'vue-toastification';
const toast = useToast()

export default {
  install: (app: any, options: any) => {
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
        const token = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME)
        if (token) config.headers['Authorization'] = `Bearer ${token}` // Set JWT token
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
          localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, response.headers.authorization)
          response.data.token = response.headers.authorization
        }
        return response.data
      },
      error => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message, { position: "top-center", timeout: 5000})
        return Promise.reject(error)
      }
    )
    app.config.globalProperties.$axios = service;
    app.provide('$axios', service);
    return service
  }
}
