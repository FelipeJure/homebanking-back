const { Router } = require('express');
const { get_payments } = require ('../controllers/paymentsControllers');
const router = Router();


// ver historial de pago
router.get('/get_payments/:userId', get_payments)




module.exports = router;