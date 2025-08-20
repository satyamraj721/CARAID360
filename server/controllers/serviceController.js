const Service = require('../models/Service');

exports.list = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ services });
  } catch (e) { next(e); }
}

exports.create = async (req, res, next) => {
  try {
    const { title, description, price, durationMinutes } = req.body;
    if (!title || price == null || durationMinutes == null) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const service = await Service.create({ title, description, price, durationMinutes, createdBy: req.userId });
    res.status(201).json({ service });
  } catch (e) { next(e); }
}

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, durationMinutes } = req.body;
    const service = await Service.findByIdAndUpdate(
      id,
      { $set: { title, description, price, durationMinutes } },
      { new: true, runValidators: true }
    );
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ service });
  } catch (e) { next(e); }
}

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ success: true });
  } catch (e) { next(e); }
}

