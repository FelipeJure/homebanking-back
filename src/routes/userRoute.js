const { Router } = require('express');
const { update_user, get_user } = require ('../controllers/userControllers.js')
const router = Router();


// obtener datos del usuario
router.get('/getUser', get_user)

// modificar datos de usuario (solo permitido address y telephone)
router.put('/update', update_user)


module.exports = router;