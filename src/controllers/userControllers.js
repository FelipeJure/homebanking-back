const { User } = require ('../db.js');


// crea un usuario, pasando por body el nombre, apellido, DNI, telefono, email, 
// direccion, fecha de nacimiento y contraseña.
async function createUser(req, res, next) {
    try{
        console.log(req.body)
    const { name, last_name, email, telephone, identity, 
        address, birth_date, password } = req.body

        const [user, created] = await User.findOrCreate({
            where: { identity },
            defaults: {
                name,
                last_name,
                telephone,
                email,
                address,
                birth_date,
                password
            }
            });
        if (created) res.send({message: 'Usuario creado con exito'})
        else res.send({message: 'El usuario que intentas crear ya existe'})
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { createUser }