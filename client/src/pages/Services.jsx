import { useEffect, useState } from 'react'
import api from '../api/api'
import ServiceCard from '../components/ServiceCard'

export default function Services() {
  const [services, setServices] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/services').then(({ data }) => setServices(data.services)).catch(() => setError('Failed to load services'))
  }, [])

  return (
    <div className="container-page">
      <h2 className="text-2xl font-semibold mb-4">Services</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(s => (
          <ServiceCard key={s._id} service={s} />
        ))}
      </div>
    </div>
  )
}

