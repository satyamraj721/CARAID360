// Seed script to create an admin user and sample services
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const { connectDB } = require('../config/db');
const User = require('../models/User');
const Service = require('../models/Service');

async function run() {
  await connectDB();

  const adminEmail = 'admin@autoaid360.io';
  const exists = await User.findOne({ email: adminEmail });
  if (!exists) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await User.create({ name: 'Admin', email: adminEmail, passwordHash, role: 'admin' });
    console.log('Admin user created:', adminEmail, 'password: admin123');
  } else {
    console.log('Admin user exists:', adminEmail);
  }

  const count = await Service.countDocuments();
  if (count === 0) {
    await Service.insertMany([
      { title: 'On-Demand Repair', description: 'Quick roadside diagnostics & repair', price: 79, durationMinutes: 60 },
      { title: 'EV Battery Delivery', description: 'Battery drop-off and installation', price: 99, durationMinutes: 90 },
      { title: 'Emergency Towing', description: '24/7 towing to nearest service center', price: 149, durationMinutes: 120 }
    ]);
    console.log('Sample services created');
  } else {
    console.log('Services already seeded');
  }

  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); })

