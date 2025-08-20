import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import api from '../api/api'

export default function Booking() {
  const [services, setServices] = useState([])
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    api.get('/services').then(({ data }) => setServices(data.services)).catch(() => setError('Failed to load services'))
  }, [])

  async function submit(e) {
    e.preventDefault()
    setError(''); setSuccess('')
    try {
      const scheduledAt = dayjs(date).toISOString()
      await api.post('/bookings', { serviceId, scheduledAt })
      setSuccess('Booking created! We will notify you soon.')
      setServiceId(''); setDate('')
    } catch (e) {
      setError(e?.response?.data?.message || 'Booking failed')
    }
  }

  return (
    <div className="container-page max-w-lg">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Book a Service</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        {success && <div className="text-green-600 mb-3">{success}</div>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Service</label>
            <select className="input" value={serviceId} onChange={(e) => setServiceId(e.target.value)} required>
              <option value="">Select a service</option>
              {services.map(s => <option key={s._id} value={s._id}>{s.title} (${s.price})</option>)}
            </select>
          </div>
          <div>
            <label className="label">Preferred time</label>
            <input type="datetime-local" className="input" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <button className="btn btn-primary w-full">Book</button>
        </form>
      </div>
    </div>
  )
}

