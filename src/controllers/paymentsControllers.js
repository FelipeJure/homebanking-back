const { Loan, User, Bank_account, Payment_history } = require ('../db.js');

const get_payments = async (req, res) => {
    try {
        const { userId } = req.params
        if(!userId) return res.status(404).send({message: "You have to send the userId"})
        const payments = await Payment_history.findAll({
            where: {
                userId
            }
        })
        if(!payments.length) return res.status(404).send({message: "You don't have payments"})
        return res.status(200).send(payments)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { get_payments }