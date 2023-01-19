const { Router } = require('express');
const { createUser } = require ('../controllers/userControllers.js')
const router = Router();


// crear un nuevo usuario, se pasan los datos por body
router.post('/create',createUser)

module.exports = router;