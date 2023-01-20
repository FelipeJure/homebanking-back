const { Router } = require('express');
const { createAccount } = require ('../controllers/accountController.js')
const router = Router();


// crear una nueva cuenta bancaria, se pasan los datos por body
router.post('/create',createAccount)

module.exports = router;