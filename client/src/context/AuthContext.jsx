import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function bootstrap() {
      if (!token) { setLoading(false); return }
      try {
        const { data } = await api.get('/users/me')
        setUser(data.user)
      } catch (_) {
        setToken(null)
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }
    bootstrap()
  }, [token])

  async function signup(payload) {
    // Option A: LocalStorage token (below)
    // Option B: HTTP-only cookie (already set by server). You can skip localStorage and rely on cookie.
    const { data } = await api.post('/auth/signup', payload)
    if (data.token) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
    }
    setUser(data.user)
  }

  async function login(payload) {
    const { data } = await api.post('/auth/login', payload)
    if (data.token) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
    }
    setUser(data.user)
  }

  async function logout() {
    try { await api.post('/auth/logout') } catch (_) {}
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

