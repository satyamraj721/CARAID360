const express = require('express');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes here are protected
router.use(auth);

// GET / - list items of current user
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) { next(err); }
});

// POST / - create item
router.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const item = await Item.create({ user: req.userId, title, content });
    res.status(201).json({ item });
  } catch (err) { next(err); }
});

// PUT /:id - update item
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const item = await Item.findOneAndUpdate(
      { _id: id, user: req.userId },
      { $set: { title, content } },
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ item });
  } catch (err) { next(err); }
});

// DELETE /:id - delete item
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findOneAndDelete({ _id: id, user: req.userId });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;

