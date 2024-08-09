const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization.spilt(' ')[1];
    if (!token) return res.status(401).send('Access Denied: No token provided')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY)
        req.userPlaylode = decoded;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json('invalid tokan')
    }

}
const generateTokan = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRETKEY)

}

module.exports = {jwAuthMiddleware,generateTokan };