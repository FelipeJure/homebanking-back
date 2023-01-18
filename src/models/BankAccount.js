const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('bankAccount', {
        // puede ser unicamente cuenta corriente o caja de ahorros
        type: {
            type: DataTypes.ENUM(['currentAccount', 'savingAccount']),
            allowNull: false
        },
        typeOfMoney: {
            type: DataTypes.STRING,
            defaultValue: 'euros'
        },
// ver si es compatible ya que donde dice null, deberia ir la longitud del numero
        money: {
            type: DataTypes.FLOAT(null,2),
            defaultValue: 0
        }
    });
};
