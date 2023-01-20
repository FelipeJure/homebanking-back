const { Router } = require('express');
const { create_user, update_user, get_user } = require ('../controllers/userControllers.js')
const router = Router();


// obtener datos del usuario
router.get('/getUser/:email', get_user)

// crear un nuevo usuario, se pasan los datos por body
router.post('/create',create_user)

// modificar datos de usuario (solo permitido address y telephone)
router.put('/update', update_user)


module.exports = router;