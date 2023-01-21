const { User } = require ('../db.js');
const { Op } = require("sequelize");
const { generateToken } = require('../services/token');
const { verify_string, verify_email } = require ('./helpers.js');
const md5 = require('md5');

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.sendStatus(400)

    const user = await User.findOne({
        where: { 
            email,
            password: md5(password) 
        }
    })
    if(!user) return res.sendStatus(401)

    const accesToken = generateToken({userId:user.id})
    return res.status(200).send({message: 'User authenticated', token: accesToken})

}

// crea un usuario, pasando por body el nombre, apellido, DNI, telefono, email, 
// direccion, fecha de nacimiento y contraseña.
const register = async (req, res, next) => {
    try{
        const { name, last_name, email, telephone, identity, 
            address, birth_date, password } = req.body
        // primero verifico que todos los datos existan y sean de tipo string, sino mando un error
        const every_strings = verify_string(name, last_name, telephone, identity, address, birth_date, password)
        if(!every_strings) return res.status(400).send({message: 'Error in the data format, only accepts string and must send all data.'})
        const true_email = verify_email(email)
        if(!true_email) return res.status(400).send({message: 'Invalid email'})

        // verifica que no haya ningun usuario con ese email o identity, si existe, devuelve un error
        const existentUser = await User.findOne({
            where:{
                [Op.or]: [{email}, {identity}]
            }
        })
        if(existentUser) {
            return res.status(400).send({message: 'Email or identity already exist'})
        }
        const user = await User.create({
            name,
            last_name,
            identity, 
            email,
            password,
            telephone,
            address,
            birth_date
        });
        if (user) return res.status(201).send({
            id: user.id,
            name:user.name,
            last_name,
            email: user.email,
            telephone: user.telephone,
            address: user.address,
            birth_date: user.birth_date 
        })
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { login, register }