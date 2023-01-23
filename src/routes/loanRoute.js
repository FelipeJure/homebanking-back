const { Router } = require('express');
const { request_loan, accept_loan, cancel_loan } = require ('../controllers/loanControllers');
const { only_admin } = require('../middlewares/authorization');

const router = Router();


// solicitar un prestamo
router.post('/request',request_loan)

// cancelar el prestamo
router.put('/cancel/:loanId', cancel_loan)

// el administrador puede acceder a esta ruta y aceptar el prestamo
router.put('/accept/:loanId', only_admin, accept_loan)



module.exports = router;