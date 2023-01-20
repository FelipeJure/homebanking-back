const { Router } = require('express');
const userRoute = require('./userRoute');
const accountRoute = require('./accountRoute');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// 
router.use('/user', userRoute);
router.use('/account', accountRoute)


module.exports = router;