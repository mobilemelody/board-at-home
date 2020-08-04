module.exports = function(req, res, next) {
    const jwt = require('jsonwebtoken')
    const dotenv = require('dotenv')

    // Bearer token and username
    const bearerHeader = req.headers.authorization // Bearer <token>
    const id = req.headers.from

    if (bearerHeader == null || id == null) {
        return res.status(400).set({
            "Content-Type": "application/json",
        }).send({ 
            message: "Header is required" 
        })
    }

    // Split token from bearer header
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1] // <token>

    // Verify token
    jwt.verify(bearerToken, process.env.PrivateKey, function(err, decoded) {
    if (err != null) {
        return res.status(400).set({
            "Content-Type": "application/json",
        }).send({
            status: 'error',
            message: err,
        })  
    }

    // If valid token, but username doesn't match
    if (decoded.id !== parseInt(id)) {
    return res.status(400).set({
        "Content-Type": "application/json",
      }).send({
        status: 'error',
        message: 'invalid username-token combination',
      })
    }

    // Else continue to route
    return next()
    })
}