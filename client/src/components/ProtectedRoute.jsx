import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="max-w-6xl mx-auto px-4 py-8">Loading...</div>
  return user ? children : <Navigate to="/login" replace />
}

