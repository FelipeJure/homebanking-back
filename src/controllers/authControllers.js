const { Op } = require("sequelize");
const md5 = require('md5');
const { User } = require ('../db.js');
const { verify_string, verify_email, validate_password } = require ('./helpers.js');
const { generateToken } = require('../middlewares/token');
const { sendEmail } = require('../services/sendEmail.js');


const login = async (req, res) => {
    try {
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
    catch (error) {
        console.log(error)
        return res.status(400)
    }
}

// crea un usuario, pasando por body el nombre, apellido, DNI, telefono, email, 
// direccion, fecha de nacimiento y contraseña.
const register = async (req, res, next) => {
    try{
        const { name, last_name, email, telephone, identity, 
            address, birth_date, password, role } = req.body
        // primero verifico que todos los datos existan y sean de tipo string, sino mando un error
        const every_strings = verify_string(name, last_name, telephone, identity, address, birth_date, password)
        if(!every_strings) return res.status(400).send({message: 'Error in the data format, only accepts string and must send all data.'})
        const true_email = verify_email(email)
        if(!true_email) return res.status(400).send({message: 'Invalid email'})
        if(!validate_password(password)) return res.status(400).send({message: 'The password has to contain between 8 and 12 characters, upercase and lowercase'})
        if(!['admin', 'client', undefined].includes(role)) return res.sendStatus(400) 

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
            birth_date,
            role
        });
        if (user) return res.status(201).send({
            id: user.id,
            name:user.name,
            last_name,
            email: user.email,
            telephone: user.telephone,
            address: user.address,
            role: user.role,
            birth_date: user.birth_date 
        })
    }
    catch (error) {
        console.log(error)
        return res.status(400)
    }
}

/* cuando el usuario olvida su contraseña, recibiendo su email por body, se manda un email con 
un link donde va a estar una ruta la cual se debe crear en el Front, recibiendo el token
por params, para que el Front pueda asi enviar la nueva contraseña al Back.
*/
const forgot_password = async (req, res) => {
    try{
        const { email } = req.body
        if (!email) return res.sendStatus(400)

        const user = await User.findOne({
            where: {
                email
            }
        })
        if(!user) return res.status(404).send({message: 'Invalid email'})
        const token = generateToken({userId:user.id})

        const recover_link = `http://localhost:3001/auth/update_password/${token}`

        // se manda un email con el link
        const information = {
            link: recover_link,
            name: user.name,
            email: user.email
        }
        
        const code = await sendEmail(information)
        const response = {}
        if(code === 200) response.message = 'Check your email to create a new password'
        else response.message = 'Something went wrong'
        return res.status(code).send(response)
    }
    catch (error) {
        res.status(400).send(error)
    }
}

// aqui el usuario no recuerda su contraseña, pero al tener el token, puede modificarla 
const new_password = async (req, res) => {
    try {
        const id = req.userId
        const { newPassword } = req.body
        if(!newPassword) return res.sendStatus(400)

        await User.update({
            password: newPassword
        },{
            where: {
                id 
            } 
        })

        return res.status(200).send({message: 'Password succesfully changed'})
    }
    catch (error) {
        console.log(error)
        return res.status(400)
    }
}

// aqui el usuario recuerda su contraseña, pero simplemente quiere cambiarla
const change_password = async (req, res) => {
    try {
        const id = req.userId
        const { newPassword, oldPassword } = req.body
        
        const user = await User.findOne({
            where: {
                id,
                password: md5(oldPassword)
            }
        })
        if(!user) res.sendStatus(404)
        
        await user.update({password: newPassword})
        res.status(200).send({message: 'Password succesfully changed'})
    }
    catch (error) {
        console.log(error)
        return res.status(400)
    }
}

module.exports = { login, register, forgot_password, new_password, change_password }