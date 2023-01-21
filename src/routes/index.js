const { Router } = require('express');
const authenticationRoute = require('./authenticationRoute');
const userRoute = require('./userRoute');
const accountRoute = require('./accountRoute');
const loanRoute = require('./loanRoute');
const paymentRoute = require('./paymentRoute');
const { validateToken } = require('../services/token');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/auth', authenticationRoute)

router.use('/user',validateToken, userRoute);

router.use('/account',validateToken, accountRoute);

router.use('/loan',validateToken, loanRoute);

router.use('/payment',validateToken, paymentRoute)


module.exports = router;