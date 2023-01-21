const { Router } = require('express');
const { login, register, recover_password } = require ('../controllers/authControllers');
const router = Router();


router.post('/login', login)

router.post('/register', register)

router.post('/recover_password', recover_password)

module.exports = router;