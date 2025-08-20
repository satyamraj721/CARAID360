import { Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function Home() {
  const { isAuthenticated } = useAuth()
  return (
    <div className="container-page">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-2">Welcome to MERN Startup</h1>
        <p className="text-gray-600 mb-6">A production-ready MERN template with authentication and user profile management.</p>
        <div className="flex gap-3">
          {isAuthenticated ? (
            <Link className="btn btn-primary" to="/dashboard">Go to Dashboard</Link>
          ) : (
            <>
              <Link className="btn btn-primary" to="/signup">Create an account</Link>
              <Link className="btn btn-outline" to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

