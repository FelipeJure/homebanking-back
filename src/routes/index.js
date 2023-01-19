const { Router } = require('express');
const userRoute = require('./userRoute');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// 
router.use('/user', userRoute);



module.exports = router;