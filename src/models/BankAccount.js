const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('bankAccount', {
        // puede ser unicamente cuenta corriente o caja de ahorros
        type: {
            type: DataTypes.ENUM(['currentAccount', 'savingAccount']),
            allowNull: false
        },
        IBAN: {
            type: DataTypes.STRING,
            unique: true,
            autoIncrement: true
        },
// ver si es compatible ya que donde dice null, deberia ir la longitud del numero
        amount: {
            type: DataTypes.FLOAT(null,2),
            defaultValue: 0
        }
    },
    { 
        timestamps: true,
        createdAt: "created_date", // createdAt va a aparecer como created_date
        updatedAt: false, // no va a aparecer updatedAt
    }
    );
};
