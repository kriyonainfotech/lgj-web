const express = require('express');
const { createAppointment, handleContactForm } = require('../controller/appointmentController');
const router = express.Router();

// Route to handle the virtual view form submission
router.post('/request-virtual-view', createAppointment);
router.post('/send-message', handleContactForm);

module.exports = router;