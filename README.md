## MERN Startup

Production-ready MERN stack starter with authentication, protected routes, and profile management.

### Stack
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- Frontend: React, Vite, TailwindCSS, React Router, Axios

### Quick Start
1. Copy `.env.example` to `.env` and fill values.
2. Install root deps: `npm install`.
3. Install server and client deps: `npm run setup` (or run install inside each).
4. Start dev servers: `npm run dev`.
5. Open the app: http://localhost:5173

### Scripts
- `npm start`: start backend (production mode)
- `npm run dev`: run backend (nodemon) and frontend (Vite) concurrently
- `npm run build`: build frontend

### Deployment
- Configure environment variables on your host (Render, Vercel, Netlify). Point frontend to backend API URL via `VITE_API_URL`.

# CARAID360