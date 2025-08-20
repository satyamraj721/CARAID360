import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!token

  const api = useMemo(() => {
    const instance = axios.create({ baseURL: API_URL })
    instance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
    return instance
  }, [token])

  useEffect(() => {
    async function bootstrap() {
      if (!token) {
        setIsLoading(false)
        return
      }
      try {
        const { data } = await api.get('/auth/me')
        setUser(data.user)
      } catch (e) {
        setToken(null)
        localStorage.removeItem('token')
      } finally {
        setIsLoading(false)
      }
    }
    bootstrap()
  }, [token, api])

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    setToken(data.token)
    localStorage.setItem('token', data.token)
    setUser(data.user)
  }

  async function signup(name, email, password) {
    const { data } = await api.post('/auth/signup', { name, email, password })
    setToken(data.token)
    localStorage.setItem('token', data.token)
    setUser(data.user)
  }

  function logout() {
    setToken(null)
    localStorage.removeItem('token')
    setUser(null)
  }

  async function updateProfile(payload) {
    const { data } = await api.put('/auth/me', payload)
    setUser(data.user)
  }

  const value = {
    api,
    token,
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

