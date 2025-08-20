const path = require('path');
const dotenv = require('dotenv');
// Load env from both server/.env and project root .env for flexibility
const envCandidates = [
  path.resolve(__dirname, '.env'),
  path.resolve(__dirname, '../.env'),
  path.resolve(process.cwd(), '.env')
];
for (const p of envCandidates) {
  dotenv.config({ path: p });
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const itemRoutes = require('./routes/items');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',') : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', routes);
app.use('/api/items', itemRoutes);

// 404 and error handling
app.use(notFound);
app.use(errorHandler);

// DB Connection and server start
const PORT = process.env.PORT || 5000;
async function start() {
  try {
    await connectDB();
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();

