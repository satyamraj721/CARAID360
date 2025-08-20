import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { isAuthenticated } = useAuth()
  return (
    <div className="container-page">
      <div className="card grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-3">AUTOAID 360</h1>
          <p className="text-gray-600 mb-6">AI-ready roadside assistance & EV mobility: on-demand repairs, battery delivery, EV charging support, accident protection, and 24/7 emergency help.</p>
          <div className="flex gap-3">
            <Link className="btn btn-primary" to="/booking">Book Now</Link>
            <Link className="btn btn-outline" to="/services">Explore Services</Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img src="/brand/autoaid360_logo.svg" alt="AUTOAID 360" className="w-full max-w-md" />
        </div>
      </div>
      <a href="https://wa.me/1234567890?text=Hi%20AUTOAID%20360%2C%20I%20need%20assistance" className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full px-5 py-3 shadow-lg">WhatsApp Us</a>
    </div>
  )
}

