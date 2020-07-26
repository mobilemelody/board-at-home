module.exports = function(req, res, next) {
    var jwt = require('jsonwebtoken')

    // Bearer token and username
    const bearer_header = req.headers.authorization // Bearer <token>
    const from = req.headers.from

    if (bearer_header == null || from == null) {
        return res.status(400).set({
            "Content-Type": "application/json",
        }).send({ 
            message: "Header is required" 
        })
    }

    // Split token from bearer header
    const bearer = bearer_header.split(' ')
    const bearer_token = bearer[1] // <token>

    // Verify token
    jwt.verify(bearer_token, 'secret', function(err, decoded) {
    if (err != null) {
        return res.status(400).set({
            "Content-Type": "application/json",
        }).send({
            status: 'error',
            message: err,
        })  
    }

    // If valid token, but username doesn't match
    if (decoded.username !== from) {
    return res.status(400).set({
        "Content-Type": "application/json",
      }).send({
        status: 'error',
        message: 'invalid username-token combination',
      })
    }

    console.log("In middleware")

    // Else continue to route
    return next()
    })
}