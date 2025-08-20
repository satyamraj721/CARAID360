export default function ServiceCard({ service, onBook }) {
  return (
    <div className="card flex flex-col gap-2">
      <h3 className="text-lg font-semibold">{service.title}</h3>
      <p className="text-gray-600 flex-1">{service.description}</p>
      <div className="flex items-center justify-between">
        <span className="font-medium">${service.price} • {service.durationMinutes}m</span>
        {onBook && <button className="btn btn-primary" onClick={() => onBook(service)}>Book</button>}
      </div>
    </div>
  )
}

