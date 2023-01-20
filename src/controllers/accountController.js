const { Bank_account } = require ('../db.js');



// obtiene todas las cuentas asociada a un usuario
// recibe por params el id del usuario
const getAccounts = async (req, res) => {
    try{
        const { userId } = req.params
        if(!userId) return res.status(404).send({message: 'Falta el id del usuario'})
        const accounts = await Bank_account.findAll({
            where:{
                userId
            }
        })
        if(!accounts.length) return res.status(404).send({message: 'El usuario no tiene ninguna cuenta creada'})
        // se mandan solo las cuentas activas
        const activeAccounts = accounts.filter(acc => acc.status === 'active')
        return res.status(200).send(activeAccounts)
    }
    catch (error) {
        console.log(error)
    }
}

// crea una cuenta bancaria, pasando por body el tipo de cuenta que puede ser
// current_account o saving_account y el id del usuario. El resto de valores como el IBAN 
// y el monto se agregan por default
const createAccount = async (req, res, next) => {
    try{
        const { type, id } = req.body
        if(!id) return res.status(404).send({message: 'Falta el id del usuario'})
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

// se elimina la cuenta para el usuario, pero queda almacenada en la DB con el status de 'deleted'
// BORRADO LOGICO
const deleteAccount = async (req,res) => {
    try{
        const id  = req.params.accountId
        if(!id) return res.status(404).send({message: 'Especificar id de la cuenta'})
        const account = await Bank_account.findByPk(id);
        if(!account) return res.status(404).send({message: 'Cuenta no encontrada'})
        account.status = 'deleted'
        await account.save()
        return res.status(200).send({message: 'Cuenta borrada con exito'})
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { getAccounts, createAccount, deleteAccount }