export default function Footer() {
  return (
    <footer className="border-t bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex justify-between">
        <p>© {new Date().getFullYear()} AUTOAID 360</p>
        <p>
          Built with MERN. Need help? <a className="text-blue-600" href="mailto:support@autoaid360.io">Contact Support</a>
        </p>
      </div>
    </footer>
  )
}

