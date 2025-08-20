const Booking = require('../models/Booking');

exports.create = async (req, res, next) => {
  try {
    const { serviceId, scheduledAt } = req.body;
    if (!serviceId || !scheduledAt) return res.status(400).json({ message: 'Missing fields' });
    const booking = await Booking.create({ user: req.userId, service: serviceId, scheduledAt });
    res.status(201).json({ booking });
  } catch (e) { next(e); }
}

exports.myBookings = async (req, res, next) => {
  try {
    const filter = { user: req.userId };
    // If mechanic, also show those assigned to them
    if (req.userRole === 'mechanic') {
      return exports.assigned(req, res, next);
    }
    const bookings = await Booking.find(filter).populate('service').sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (e) { next(e); }
}

exports.assigned = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ mechanic: req.userId }).populate('service user').sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (e) { next(e); }
}

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, mechanicId } = req.body;
    const allowed = ['pending', 'accepted', 'completed', 'cancelled'];
    if (status && !allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const booking = await Booking.findByIdAndUpdate(
      id,
      { $set: { status, mechanic: mechanicId } },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ booking });
  } catch (e) { next(e); }
}

