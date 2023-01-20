const { Router } = require('express');
const userRoute = require('./userRoute');
const accountRoute = require('./accountRoute');
const loanRoute = require('./loanRoute');
const paymentRoute = require('./paymentRoute')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// 
router.use('/user', userRoute);

router.use('/account', accountRoute);

router.use('/loan', loanRoute);

router.use('/payment', paymentRoute)

module.exports = router;