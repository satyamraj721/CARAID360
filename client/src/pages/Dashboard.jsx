import { useEffect, useState } from 'react'
import { useAuth } from '../state/AuthContext.jsx'

export default function Dashboard() {
  const { user, api } = useAuth()
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  async function load() {
    try {
      const { data } = await api.get('/items')
      setItems(data.items)
    } catch (e) {
      setError('Failed to load items')
    }
  }

  useEffect(() => { load() }, [])

  async function addItem(e) {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/items', { title, content })
      setItems([data.item, ...items])
      setTitle('')
      setContent('')
    } catch (e) { setError(e?.response?.data?.message || 'Create failed') }
  }

  async function updateItem(id, fields) {
    try {
      const { data } = await api.put(`/items/${id}`, fields)
      setItems(items.map(i => i._id === id ? data.item : i))
    } catch (e) { setError('Update failed') }
  }

  async function deleteItem(id) {
    try {
      await api.delete(`/items/${id}`)
      setItems(items.filter(i => i._id !== id))
    } catch (e) { setError('Delete failed') }
  }
  return (
    <div className="container-page">
      <div className="card space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <form onSubmit={addItem} className="grid gap-3 sm:grid-cols-3">
          <input className="input sm:col-span-1" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input className="input sm:col-span-1" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
          <button className="btn btn-primary sm:col-span-1">Add</button>
        </form>
        <div className="divide-y">
          {items.map(item => (
            <div key={item._id} className="py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <input className="input sm:w-64" value={item.title} onChange={(e) => updateItem(item._id, { title: e.target.value, content: item.content })} />
              <input className="input flex-1" value={item.content || ''} onChange={(e) => updateItem(item._id, { title: item.title, content: e.target.value })} />
              <button className="btn btn-outline" onClick={() => deleteItem(item._id)}>Delete</button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-gray-500 py-6">No items yet. Create your first one above.</p>
          )}
        </div>
      </div>
    </div>
  )
}

