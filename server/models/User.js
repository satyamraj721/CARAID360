const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /[^@\s]+@[^@\s]+\.[^@\s]+/ },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['customer', 'mechanic', 'admin'], default: 'customer', index: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

