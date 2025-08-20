import { useEffect, useState } from 'react'
import api from '../api/api'

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [services, setServices] = useState([])
  const [form, setForm] = useState({ title: '', description: '', price: '', durationMinutes: '' })
  const [error, setError] = useState('')

  async function load() {
    try {
      const [{ data: u }, { data: s }] = await Promise.all([
        api.get('/users'),
        api.get('/services')
      ])
      setUsers(u.users); setServices(s.services)
    } catch (e) { setError('Failed to load data') }
  }
  useEffect(() => { load() }, [])

  async function createService(e) {
    e.preventDefault(); setError('')
    try {
      const payload = { ...form, price: Number(form.price), durationMinutes: Number(form.durationMinutes) }
      const { data } = await api.post('/services', payload)
      setServices([data.service, ...services])
      setForm({ title: '', description: '', price: '', durationMinutes: '' })
    } catch (e) { setError(e?.response?.data?.message || 'Failed') }
  }

  async function deleteService(id) {
    try { await api.delete(`/services/${id}`); setServices(services.filter(s => s._id !== id)) } catch (_) {}
  }

  return (
    <div className="container-page">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-3">Create Service</h3>
          <form onSubmit={createService} className="grid gap-3">
            <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <textarea className="input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input className="input" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <input className="input" placeholder="Duration (minutes)" type="number" value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: e.target.value })} required />
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-3">Services</h3>
          <div className="space-y-3">
            {services.map(s => (
              <div key={s._id} className="border rounded-md p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-sm text-gray-600">${s.price} • {s.durationMinutes}m</div>
                </div>
                <button className="btn btn-outline" onClick={() => deleteService(s._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card mt-6">
        <h3 className="font-semibold mb-3">Users</h3>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

