const express = require('express');
const router = express.Router();
const middlewares = require('../config/middleware');
const UserService = require('../services/UserService');
const message = require('../response/Constants');
const LoginException = require('../exception/LoginException');

router.post("/register", async (req, res) => {
    let response;
    let status;
    const { email, password, fullName, mobile, age } = req.body;
    const user = { email: email, password: password, fullName: fullName, mobile: mobile, age: age, role: 'ROLE_USER' };
    try {

        const savedUser = await UserService.saveUser(user);
        status = 200;
        response = {
            payload: savedUser,
            success: true,
            message: message.REGISTRATION_SUCCESS_MESSAGE
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


router.post('/forgot-password', async (req, res) => {
    const email = req.body.email;
    res.json({ message: 'Email sent to ' + email });

});

// TODO: to be done
router.post('/reset-password', async (req, res) => {
    const password = req.body.password;

});

router.delete('/delete/:id',middlewares.tokenAuthentication, async (req, res) => {
    let status;
    let response;
    const id = req.params.id;
    try {
        await UserService.deleteUserById(id);
        status = 200;
        response = {
            payload: null,
            success: true,
            message: message.USER_DELETION_SUCCESS_MESSAGE
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

router.get('/', middlewares.tokenAuthentication, async (req, res) => {
    let status;
    let response;
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 100;
    const sort = req.query.sort || 'desc';
    const orderBy = req.query.orderBy || '_id';
    try {
        const users = await UserService.findAllUsers(page, size, orderBy, sort);
        status = 200;
        response = {
            payload: users.results,
            success: true,
            totalElements: users.totalRecords,
            totalPages: users.totalPages
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

router.get('/', middlewares.tokenAuthentication, async (req, res) => {
    let status;
    let response;
    try {
        const email = req.params.email;
        console.log(email);
        const user = await UserService.findUserByEmail(email);
        status = 200;
        response = {
            payload: user,
            success: true,
            message: user.length == 0 ? 'No User was found' : ''
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