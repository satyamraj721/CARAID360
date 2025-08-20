## AUTOAID 360 — MERN Startup

AI-ready roadside assistance & EV mobility platform: on-demand repairs, battery delivery, EV charging support, accident protection, and 24/7 emergency help.

### Tech Stack
- Backend: Node.js (Express), MongoDB (Mongoose), JWT, bcrypt, cookie-parser
- Frontend: React (Vite), TailwindCSS, React Router, Axios

### Environment
Copy `.env.example` to `.env` and fill values. For local dev, default frontend is at http://localhost:5173 and backend at http://localhost:5000.

### Quick Start
1. Generate brand assets (favicons, PNG logos): `npm run generate:assets`
2. Install all deps: `npm run setup`
3. Seed data: `npm --prefix server run seed`
4. Start dev servers: `npm run dev`
5. Open the app: http://localhost:5173

### Running separately
- Server: `cd server && npm install && npm run server`
- Client: `cd client && npm install && npm run dev`

### API Examples (Postman/Thunder Client)
- POST http://localhost:5000/api/auth/signup { name, email, password }
- POST http://localhost:5000/api/auth/login { email, password }
- GET  http://localhost:5000/api/users/me (with Bearer token)

### Deployment Notes
- Frontend (Vercel): set `VITE_API_URL` to your backend URL
- Backend (Render): set `PORT`, `MONGO_URI`, `JWT_SECRET`; enable web service on Node 18+

### Deploy checklist
- Vercel (frontend)
  - Project root: `client/`
  - Build command: `npm run build`
  - Output dir: `dist`
  - Env: `VITE_API_URL=https://your-backend.onrender.com`
- Render (backend)
  - Build command: `npm install`
  - Start command: `npm start`
  - Env: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_ORIGIN=https://your-frontend.vercel.app`



# CARAID360