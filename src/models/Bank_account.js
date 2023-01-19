const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('bank_account', {
        // puede ser unicamente cuenta corriente o caja de ahorros
        type: {
            type: DataTypes.ENUM('current_account', 'saving_account'),
            allowNull: false,
            defaultValue: 'current_account'
        },
        IBAN: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        amount: {
            type: DataTypes.NUMERIC(10,2),
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
