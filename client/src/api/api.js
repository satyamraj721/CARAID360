import axios from 'axios'

// Determine API URL from env or default localhost
const baseURL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000'

const api = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true // allow cookies if using http-only cookie auth
})

// Attach bearer token from localStorage if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api

