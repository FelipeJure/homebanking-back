const jwt = require('jsonwebtoken');

const key = process.env.PRIVATE_KEY_JWT;

const generateToken = (id) => {
    const expires = {expiresIn:'30m'}
    return jwt.sign(id, key, expires)
}

const validateToken = (req, res, next) => {
    const accesToken = req.headers['authorization'];
    if(!accesToken) return res.sendStatus(403)
    
    const tokenFunction = (err, user) => {
        if (err) return res.status(403).send({message: 'Invalid or expired token'})
        req.userId = user.userId
        next()
    }

    jwt.verify(accesToken, key, tokenFunction)
}

module.exports = { generateToken, validateToken }