const { User, Loan, Bank_account, Payment_history } = require ('../db.js')

const user = {
    name: "Felipe", 
    last_name:"Jure", 
    birth_date:"01/05/2000", 
    email:"felipe@gmail.com", 
    telephone:"+393295903", 
    address:"Victor 3214", 
    identity: "felipito", 
    password: 'chicha',
    role: 'admin'
}

const payments = [
    {
        amount: 1000,
        destination: "IBAN de otra cuenta",
        userId: 1
    },
    {
        amount: 765,
        destination: "IBAN de otra cuenta",
        userId: 1
    },    {
        amount: 100,
        destination: "loan",
        userId: 1,
        loanId: 1
    },
]

const add_to_DB = async () => {
    await User.create({
        name : user.name,
        identity: user.identity,  
        last_name : user.last_name,
        telephone : user.telephone,
        email : user.email,
        address : user.address,
        birth_date : user.birth_date,
        password : user.password
    });
    await Bank_account.create({
        type: "saving_account",
        amount: 43.56,
        userId:1
    })
    await Loan.create({
        amount: 1000,
        period: 24,
        interest: 15.66,
        status: "under review",
        userId: 1,
        bankAccountId: 1
    })
    await Payment_history.bulkCreate(payments)
}

module.exports = { add_to_DB }