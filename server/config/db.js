const mongoose = require('mongoose');
let memoryServer = null;

async function connectDB(uri) {
  let mongoUri = uri || process.env.MONGO_URI;
  if (!mongoUri && (process.env.USE_MEM_DB === 'true' || process.env.NODE_ENV !== 'production')) {
    // Lazy import to avoid requiring the package in production
    const { MongoMemoryServer } = require('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    mongoUri = memoryServer.getUri();
    // eslint-disable-next-line no-console
    console.log('Using in-memory MongoDB instance');
  }
  if (!mongoUri) throw new Error('MONGO_URI not set');
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri);
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
}

module.exports = { connectDB };

