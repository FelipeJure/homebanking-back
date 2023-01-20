const { Bank_account } = require ('../db.js');



// obtiene todas las cuentas asociada a un usuario
// recibe por params el id del usuario
const getAccounts = async (req, res) => {
    try{
        const userId = req.params.id
        const accounts = await Bank_account.findAll({
            where:{
                userId
            }
        })
        console.log(accounts)
        if(accounts.length) return res.status(200).send(accounts)
        else return res.status(404).send({message: 'El usuario no tiene ninguna cuenta creada'})
    }
    catch (error) {
        console.log(error)
    }
}

// crea una cuenta bancaria, pasando por body el tipo de cuenta que puede ser
// current_account o saving_account y el userId. El resto de valores como el IBAN 
// y el monto se agregan por default
const createAccount = async (req, res, next) => {
    try{
        const { type, id } = req.body

        if(type !== 'current_account' && type !== 'saving_account') return res.status(404).send({message: 'Tipo de cuenta no valida'})
        const account = await Bank_account.create({
                type,
                userId: id
            });
        res.status(201).send(account)
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { getAccounts, createAccount }