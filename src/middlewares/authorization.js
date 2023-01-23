const { User } = require('../db');

const only_admin = async (req, res, next) => {
    
    const id = req.userId

    const user = await User.findByPk(id)
    if(!user) return res.sendStatus(400)

    if (user.role !== 'admin') return res.sendStatus(403)

    next()
}

module.exports = { only_admin }