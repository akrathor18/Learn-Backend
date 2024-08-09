const jwt = require('jsonwebtoken')

const jwAuthMiddleware= (req, res, next)=>{
    const token = req.headers.authorization.spilt(' ')[1];
    if(!token) return res.status(401).send('Access Denied: No token provided')

    try {
        
    } catch (error) {
        
    }
}