import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/brand/autoaid360_logo.svg" alt="AUTOAID 360" className="h-8" />
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/services" className="btn btn-outline">Services</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
              {user.role === 'admin' && <Link to="/admin" className="btn btn-outline">Admin</Link>}
              <button className="btn btn-primary" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

