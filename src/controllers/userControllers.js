const { User } = require ('../db.js');
const { verify_string, verify_email } = require ('./helpers.js')


const get_user = async (req,res) => {
    const { identity } = req.body
    try{
        const user = User.findOne({
            where: {
                identity
            }
        })
        if(user) res.send(user)
        res.status(404).send({message: 'Usuario no encontrado'})
    }
    catch (error) {
        console.log(error)
    }
}

// crea un usuario, pasando por body el nombre, apellido, DNI, telefono, email, 
// direccion, fecha de nacimiento y contraseña.
const create_user = async (req, res, next) => {
    try{
        const { name, last_name, email, telephone, identity, 
            address, birth_date, password } = req.body
        // primero verifico que todos los datos existan y sean de tipo string, sino mando un error
        const every_strings = verify_string(name, last_name, telephone, identity, address, birth_date, password)
        if(!every_strings) res.status(404).send({message: 'Error en el formato de los datos, solo acepta string y debe enviar todos los datos'})
        const true_email = verify_email(email)
        if(!true_email) res.status(404).send({message: 'Debe enviar un email valido'})
        const user = await User.create({
            identity, 
            name,
            last_name,
            telephone,
            email,
            address,
            birth_date,
            password
        });
        if (user) res.send({message: 'Usuario creado con exito'})
        else res.send({message: 'El usuario que intentas crear ya existe'})
    }
    catch (error) {
        console.log(error)
    }
}

const update_user = async (req, res, next) => {
    try{
        const { telephone, address, identity } = req.body
        const received = [telephone, address].filter(value => value !== undefined)
        const every_strings = verify_string(...received)
        if(!every_strings) res.status(404).send({message: 'Error en el formato de los datos, solo acepta string'})
        if(!identity) res.status(404).send({message: 'Error, no se obtuvo el identity del usuario'})
        // busca el usuario por identity
        const user = await User.findOne({
            where: {
                identity
            }
        })
        /* 
        si encuentra el usuario, verifica que cada propiedad fue enviada y de ser asi,
        modifica esa respectiva propiedad del usuario pero si no lo encuentra envia un 
        error 404 con un mensaje que dice "El usuario no existe, verifica los datos enviados"*/
        if(user){
            [telephone, address].forEach(value => value && (user.value = value))
        }
        else res.status(404).send({message: "El usuario no existe, verifica los datos enviados"})
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = { get_user, create_user, update_user }