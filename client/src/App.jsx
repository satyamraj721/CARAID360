import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import Services from './pages/Services.jsx'
import Booking from './pages/Booking.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuth } from './context/AuthContext'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="container-page">Loading...</div>
  return user ? children : <Navigate to="/login" replace />
}

function Nav() {
  const { isAuthenticated, logout, user } = useAuth()
  return (
    <nav className="border-b bg-white">
      <div className="container-page flex items-center justify-between">
        <Link to="/" className="font-semibold">MERN Startup</Link>
        <div className="flex items-center gap-3">
          <Link to="/" className="btn btn-outline">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
              <Link to="/profile" className="btn btn-outline">{user?.name || 'Profile'}</Link>
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

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  )
}

