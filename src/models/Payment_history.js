const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('payment_history', {
        amount: {
            type: DataTypes.NUMERIC(10,2),
            defaultValue: 0
        },
        // en destination iria el IBAN en caso de ser transferencia de dinero a otra cuenta
        // si el pago fuese de un prestamo, no tendria IBAN, pero tendria una FK con tabla loan
        destination: {
            type: DataTypes.STRING,
        }
    },
    { 
        timestamps: true,
        createdAt: "date", // createdAt va a aparecer como date
        updatedAt: false, // no se va a guardar updatedAt
    });
};