const { User } = require ('../db.js');
const { Op } = require("sequelize");
const { verify_string, verify_email } = require ('./helpers.js')


const get_user = async (req,res) => {
    try{
        const { email } = req.params
        if(!email) return res.status(404).send({message: 'Email no recibido'})
        const true_email = verify_email(email)
        if(!true_email) return res.status(404).send({message: 'Debe enviar un email valido'})

        const user = await User.findOne({
            where: {
                email
            }
        })

        if(!user) return res.status(404).send({message: 'Usuario no encontrado'})
        return res.send(user)
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
        if(!every_strings) return res.status(404).send({message: 'Error en el formato de los datos, solo acepta string y debe enviar todos los datos'})
        const true_email = verify_email(email)
        if(!true_email) return res.status(404).send({message: 'Debe enviar un email valido'})

        // verifica que no haya ningun usuario con ese email o identity, si existe, devuelve un error
        const existentUser = await User.findOne({
            where:{
                [Op.or]: [{email}, {identity}]
            }
        })
        if(existentUser) {
            return res.status(404).send({message: 'Email o DNI ya ingresado en base de datos'})
        }
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
        if (user) return res.send(user)
        else return res.send({message: 'El usuario que intentas crear ya existe'})
    }
    catch (error) {
        console.log(error)
    }
}

const update_user = async (req, res, next) => {
    try{
        const { telephone, address, id } = req.body
        const received = [telephone, address].filter(value => value !== undefined)
        const every_strings = verify_string(...received)
        if(!every_strings) return res.status(404).send({message: 'Error en el formato de los datos, solo acepta string'})
        if(!id) return res.status(404).send({message: 'Error, no se obtuvo el id del usuario'})
        // busca el usuario por id
        const user = await User.findByPk(id)
        /* 
        si encuentra el usuario, verifica que cada propiedad fue enviada y de ser asi,
        modifica esa respectiva propiedad del usuario pero si no lo encuentra envia un 
        error 404 con un mensaje que dice "El usuario no existe, verifica los datos enviados"*/
        if(user){
            if(telephone) user.telephone = telephone
            if(address) user.address = address
            await user.save()
            return res.send(user)
        }
        else return res.status(404).send({message: "El usuario no existe, verifica los datos enviados"})
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = { get_user, create_user, update_user }