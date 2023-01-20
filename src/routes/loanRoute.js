const { Router } = require('express');
const { request_loan, accept_loan } = require ('../controllers/loanControllers');
const router = Router();


// solicitar un prestamo
router.post('/request',request_loan)

router.put('/accept/:loanId',accept_loan)

// modificar datos de usuario (solo permitido address y telephone)
// router.put('/update', update_user)


module.exports = router;