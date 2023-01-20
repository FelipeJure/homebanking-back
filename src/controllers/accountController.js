const { Bank_account } = require ('../db.js');


// crea una cuenta bancaria, pasando por body el tipo de cuenta que puede ser
// current_account o saving_account y el userId. El resto de valores como el IBAN 
// y el monto se agregan por default
async function createAccount(req, res, next) {
    try{
        const { type, userId } = req.body

        if(type !== 'current_account' && type !== 'saving_account') {
            res.status(404).send({
                
            })
        }
        const account = await Bank_account.create({
                type,
                userId
            });
        res.status(201).send({        
            IBAN: account.IBAN,
            amount: account.amount,
            type: account.type,
            userId: account.userId, 
        })
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { createAccount }