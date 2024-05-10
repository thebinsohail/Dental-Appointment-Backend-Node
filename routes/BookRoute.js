const express = require('express');
const router = express.Router();
const jwtUtil = require('../jwt/JwtUtil');
const middlewares = require('../config/middleware');
const UserService = require('../services/UserService');
const message = require('../response/Constants');
const AppointmentService = require('../services/AppointmentService');


router.post("/appointment", middlewares.tokenAuthentication, async (req, res) => {
    let status;
    let response;
    const user = req.user;
    const { email, mobile, dateOfAppointment } = req.body;
    const appointment = {
        user: user,
        email: email,
        mobile: mobile,
        dateOfAppointment: dateOfAppointment
      };
    try {
        const booking = await AppointmentService.bookAppointment(appointment);
        status = 200;
        response = {
            payload: booking,
            success: true,
            message: message.APPOINTMENT_SUCCESS_MESSAGE
        };
        return booking;

    } catch (error) {
        status = 400;
        response = {
            payload: null,
            success: false,
            message: error.message
        };
    }
    return res.status(status).send(response);
});

module.exports = router;