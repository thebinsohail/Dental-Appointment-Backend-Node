const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config({ path: "../.env" });

const middlewares = {
    tokenAuthentication: function (req, res, next) {

    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token!=null || token!= undefined){
            jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(403).send({ message: "Invalid Token Access Token" })
                //set the user to the context
                req.user = user;
                next();
            });
        }else{
            return res.status(403).send({ message: "Please provide the Access Token" });
        }    

    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }

 }
}

module.exports = middlewares;
