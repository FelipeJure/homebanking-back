const { Router } = require('express');
const { login, register, forgot_password, new_password, change_password } = require ('../controllers/authControllers');
const { validateToken } = require('../middlewares/token');
const router = Router();


// registro, recibe los datos personales y contraseña por body y crea usuario
router.post('/register', register)

// verifica email y contraseña y devuelve token
router.post('/login', login)

// solicitar nueva contraseña, recibe email por body
router.post('/forgot_password', forgot_password)

// recibe token por header y nueva contraseña por body
router.put('/new_password', validateToken, new_password)

// recibe token por header, contraseña actual y nueva contraseña por body
router.put('/change_password', validateToken, change_password)

module.exports = router;