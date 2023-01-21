const { Loan, User, Bank_account } = require ('../db.js');
const { right_number, verify_number, verify_integer, next_month } = require('./helpers');

// se solicita el prestamo pasando por body el monto, periodo, tasa de interes, id del
// usuario y el id de la cuenta bancaria a la que se va a depositar ese dinero
const request_loan = async (req,res) => {
    try{
        const { amount, period, interest, userId, bankAccountId } = req.body
        
        const allInformation = [amount, period, interest, userId, bankAccountId].every(value => value !== undefined)
        if(!allInformation) return res.status(400).send({message: 'You miss information'})
        
        const allNumbers = verify_number(amount, period, interest, userId, bankAccountId)
        if(!allNumbers) return res.status(400).send({message: 'Fields must be all numeric'})
        
        const integers = verify_integer(amount, period)
        if(!integers) return res.status(400).send({message: 'Amount and period must be whole numbers'})
                
        const user = await User.findByPk(userId)
        if(!user) return res.status(404).send({message: 'Invalid User'})
        
        const account = await Bank_account.findByPk(bankAccountId)
        if(!account) return res.status(404).send({message: 'Invalid account'})
        
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

const cancel_loan = async (req, res) => {
    try {
        const id = req.params.loanId
        if(!id) return res.status(400).send({message: "You have to send the load's id"})
        const found_loan = await Loan.findByPk(id)
        if(!found_loan) return res.status(404).send({message: "This load doesn't exist"})
        if(found_loan.status === 'under review') {
            found_loan.status = 'canceled';
            await found_loan.save()
            return res.status(200).send({message: 'Your loan be canceled saccesfully'})
        }
        return res.status(401).send({message: "You can't cancel this load"})

    }
    catch (error) {
        console.log(error)
    }
}

const accept_loan = async (req, res) => {
    try {
    /* esta ruta deberia acceder solo el administrador, por lo que se deberia agregar
        una propiedad al usuario que lo identifique como administrador y pueda ser validada
        en esta funcion 
    */
        const id = req.params.loanId
        if(!id) return res.status(400).send({message: "You have to send the load's id"})
        const found_loan = await Loan.findByPk(id)
        if(!found_loan) return res.status(404).send({message: "This load doesn't exist"})
        const today = new Date()
        found_loan.status = 'accepted';
        found_loan.collect = next_month(today)
        await found_loan.save()
        console.log(found_loan.collect)
        const account = await Bank_account.findByPk(found_loan.bankAccountId)
        account.amount = account.amount - (-found_loan.amount)
        await account.save()
        return res.status(200).send(account)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { request_loan, accept_loan, cancel_loan }