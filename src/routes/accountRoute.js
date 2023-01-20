const { Router } = require('express');
const { getAccounts, createAccount } = require ('../controllers/accountController.js')
const router = Router();

// devuelve todas las cuentas asociadas a un usuario, se debe pasar el id del usuario por params
router.get('/getAccounts/:id', getAccounts)

// crear una nueva cuenta bancaria, se pasan los datos por body
router.post('/create',createAccount)

module.exports = router;