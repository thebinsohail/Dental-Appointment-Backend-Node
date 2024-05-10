const express = require('express');
const router = express.Router();
const middlewares = require('../config/middleware');
const message = require('../response/Constants');
const AppointmentService = require('../services/AppointmentService');


router.post("/book", middlewares.tokenAuthentication, async (req, res) => {
    let status;
    let response;
    const user = req.user.user;
    const { patientName, email, mobile, dateOfAppointment, doctor } = req.body;
    const appointment = {
        user: user,
        doctor: doctor,
        patientName: patientName,
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

router.patch('/update/:id', middlewares.tokenAuthentication, async (req, res) => {
    let status;
    let response;

    try {
        if (req.user.role != 'ROLE_DOCTOR' || req.user.role != 'ROLE_ADMIN') {
            throw new Error("Appointment status can only be changed by the doctor or admin");
        }
        const id = req.params.id;
        const appointmentStatus = req.query.status;
        const updateAppointmentStatus = await AppointmentService.updateAppointmentById(id, appointmentStatus);
        if (updateAppointmentStatus != null || updateAppointmentStatus != undefined) {
            status = 200;
            const responseMessage = AppointmentService.getResponseMessage(appointmentStatus);
            response = {
                payload: updateAppointmentStatus,
                success: true,
                message: responseMessage
            };
        } else {
            throw Error("There was a problem updating the appointment");
        }
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