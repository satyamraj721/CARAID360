const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, trim: true, maxlength: 5000 }
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

