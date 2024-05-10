const express = require('express');
const router = express.Router();
const message = require('../response/Constants');
const LoginException = require('../exception/LoginException');
const UserService = require('../services/UserService');
const jwtUtil = require('../jwt/JwtUtil');

router.post("/login", async (req, res) => {
    console.log(req.body);
    let response;
    let status = 200;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await UserService.findUserByEmailAndPassword(email, password);
        const token = jwtUtil.generateAccessToken(user);
        response = {
            payload: user,
            accessToken: token,
            success: true,
            message: message.LOGIN_SUCCESS_URL
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
                message: 'User does not exists!'
            };
        }

    }
    return res.status(status).send(response);

});

module.exports = router;