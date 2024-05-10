const User = require('../models/user/User');
const bcrypt = require('bcrypt');
const LoginException = require('../exception/LoginException');

const UserService = {
    saveUser: async function save(user) {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
        const newUser = new User({
            email: user.email,
            password: hashedPassword,
            fullName: user.fullName,
            mobile: user.mobile,
            age: user.age,
            role: user.role,
            createdAt: new Date()
        });

        // Save the new user to the database
        const userDb = await newUser.save()
            .then(savedUser => {
                return savedUser;
            });
        return userDb;


    },

    findUserByEmail: async function (email) {
        const users = await User
            .find({ email: email })
            .then((user) => { return user; });
        return users;
    },

    findUserByEmailAndPassword: async function (email, password) {
        const user = await User
            .findOne({ email: email })
            .then((user) => {
                if (user.email === email && bcrypt.compareSync(password, user.password)) {
                    // success
                    return user;
                }
                if (user.email === email && user.password != password) {
                    throw new LoginException(
                        'Invalid Credentials!',
                        400,
                    );
                }

                else {
                    throw new LoginException(
                        404,
                        'User not found with that email'
                    );
                }
            });

        return user;
    },
    findAllUsers: async function (page, size, orderBy, sort) {
        const users = await User
            .find({})
            .limit(size)
            .skip((page) * size)
            .sort({ [orderBy]: sort })
            .exec();
        const totalDocuments = await User.countDocuments();
        const totalPages = Math.ceil(totalDocuments / size);
        const response = {
            results: users,
            totalRecords: totalDocuments,
            totalPages: totalPages
        };
        return response;
    },
    deleteUserById: async function (id) {
        await User.deleteOne({
            _id: id
        }).then((error) => {console.log(error)});
    }
};

module.exports = UserService;