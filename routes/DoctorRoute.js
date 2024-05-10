const express = require('express');
const router = express.Router();
const middlewares = require('../config/middleware');
const message = require('../response/Constants');
const LoginException = require('../exception/LoginException');
const UserService = require('../services/UserService');
const DoctorService = require('../services/DoctorService');

router.post("/register", async (req, res) => {
    let response;
    let status;
    const { email, password, fullName, mobile, age } = req.body;
    const user = { email: email, password: password, fullName: fullName, mobile: mobile, age: age, role: 'ROLE_DOCTOR'};
    try {
        const userRegistration = await UserService.saveUser(user);
        const doctor = {
            user: user,
            qualification: req.body.qualification
        };
        const doctorRegistration = await DoctorService.registerDoctor(doctor);
        status = 200;
        response = {
            payload: { user: userRegistration, doctor: doctorRegistration },
            success: true,
            message: message.REGISTRATION_DOCTOR_SUCCESS_MESSAGE
        };

    } catch (error) {
        if (error instanceof LoginException) {
            status = error.status;
            response = {
                payload: null,
                success: false,
                message: error.message
            };
        } else {
            status = 400;
            response = {
                payload: null,
                success: false,
                message: error.message
            };
        }
    }
    return res.status(status).send(response);
});

router.post('/status/:id',middlewares.tokenAuthentication,async (req,res)=>{
        
});

module.exports = router;