const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Set up Global configuration access
dotenv.config({ path: "../.env" });

module.exports = {
    generateAccessToken: function (user) {
        return jwt.sign({ user: user },
            process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRY_TIME });
    },

    generateRefreshToken: function ({ user }) {
        return jwt.sign({ user: user },
            process.env.JWT_REFRESH_TOKEN_SECRET);
    }
};
