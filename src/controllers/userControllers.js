const { User } = require ('../db.js');
const { verify_string } = require ('./helpers.js')


const get_user = async (req,res) => {
    try{
        const id = req.userId
        console.log(id)
        if(!id) return res.status(400).send({message: 'You have to send an id'})

        const user = await User.findByPk(id)

        if(!user) return res.status(404).send({message: 'User not found'})
        return res.send(user)
    }
    catch (error) {
        console.log(error)
    }
}

const update_user = async (req, res, next) => {
    try{
        const id = req.userId
        const { telephone, address } = req.body
        const received = [telephone, address].filter(value => value !== undefined)
        const every_strings = verify_string(...received)
        if(!every_strings) return res.status(400).send({message: 'Error in the data format, only accepts string'})
        if(!id) return res.status(404).send({message: 'User id not found'})
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
        else return res.status(401).send({message: "The user doesn't exist"})
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = { get_user, update_user }