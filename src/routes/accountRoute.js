const { Router } = require('express');
const { getAccounts, createAccount, deleteAccount } = require ('../controllers/accountController.js')
const router = Router();

// devuelve todas las cuentas asociadas a un usuario, se debe pasar el id del usuario por params
router.get('/getAccounts/:userId', getAccounts)

// crear una nueva cuenta bancaria, se pasan los datos por body
router.post('/create',createAccount)


router.delete('/delete/:accountId', deleteAccount)

module.exports = router;