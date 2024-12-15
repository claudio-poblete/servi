import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type' : 'application/json',
  },
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('Token en solicitud:', token);
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMsg = error.response?.data?.message || 'Error inesperado'
    console.error('Error en la solicitud:', errorMsg)
    return Promise.reject(error)
  }
)

export default api