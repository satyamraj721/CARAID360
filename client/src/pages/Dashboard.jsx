import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/api'

export default function Dashboard() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')

  async function load() {
    try {
      const { data } = await api.get('/bookings')
      setBookings(data.bookings)
    } catch (e) { setError('Failed to load bookings') }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="container-page">
      <div className="card space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="divide-y">
          {bookings.map(b => (
            <div key={b._id} className="py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="font-medium">{b.service?.title || 'Service'}</div>
              <div className="text-gray-600 flex-1">{new Date(b.scheduledAt).toLocaleString()} — {b.status}</div>
            </div>
          ))}
          {bookings.length === 0 && (
            <p className="text-gray-500 py-6">No bookings yet. Use "Book Now" to create one.</p>
          )}
        </div>
      </div>
    </div>
  )
}

