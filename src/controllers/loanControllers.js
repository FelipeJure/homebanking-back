const { Loan, User, Bank_account } = require ('../db.js');
const { right_number, verify_number, verify_integer} = require('./helpers');

// se solicita el prestamo pasando por body el monto, periodo, tasa de interes, id del
// usuario y el id de la cuenta bancaria a la que se va a depositar ese dinero
const request_loan = async (req,res) => {
    try{
        const { amount, period, interest, userId, bankAccountId } = req.body
        
        const allInformation = [amount, period, interest, userId, bankAccountId].every(value => value !== undefined)
        if(!allInformation) return res.status(404).send({message: 'Falta informacion'})
        
        const allNumbers = verify_number(amount, period, interest, userId, bankAccountId)
        if(!allNumbers) return res.status(404).send({message: 'Los campos deben ser todos numericos'})
        
        const integers = verify_integer(amount, period)
        if(!integers) return res.status(404).send({message: 'El monto y periodo deben ser numeros enteros'})
                
        const user = await User.findByPk(userId)
        if(!user) return res.status(404).send({message: 'Usuario no valido'})
        
        const account = await Bank_account.findByPk(bankAccountId)
        if(!account) return res.status(404).send({message: 'Cuenta no valida'})
        
        const right_interest = right_number(interest)
        const newLoan = await Loan.create({
            amount,
            period,
            interest: right_interest,
            userId,
            bankAccountId
        })
        return res.status(201).send(newLoan)
    }
    catch (error){
        console.log(error)
    }
}

const accept_loan = (req, res) => {
    try {

    }
    catch (error) {
        
    }
}

module.exports = { request_loan }