const express = require('express');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/auth');
const authCtrl = require('../controllers/authController');
const userCtrl = require('../controllers/userController');
const serviceCtrl = require('../controllers/serviceController');
const bookingCtrl = require('../controllers/bookingController');

const router = express.Router();

// Health
router.get('/health', (req, res) => res.json({ ok: true }));

// Auth
router.post('/auth/signup', authCtrl.signup);
router.post('/auth/login', authCtrl.login);
router.post('/auth/logout', authCtrl.logout);

// Users
router.get('/users/me', auth, userCtrl.getMe);
router.get('/users', auth, requireRole('admin'), userCtrl.getUsers);

// Services
router.get('/services', serviceCtrl.list);
router.post('/services', auth, requireRole('mechanic', 'admin'), serviceCtrl.create);
router.put('/services/:id', auth, requireRole('mechanic', 'admin'), serviceCtrl.update);
router.delete('/services/:id', auth, requireRole('mechanic', 'admin'), serviceCtrl.remove);

// Bookings
router.post('/bookings', auth, bookingCtrl.create);
router.get('/bookings', auth, bookingCtrl.myBookings);
router.put('/bookings/:id/status', auth, requireRole('mechanic', 'admin'), bookingCtrl.updateStatus);

module.exports = router;

