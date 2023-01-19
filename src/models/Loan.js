const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // prestamo
    sequelize.define('loan', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // period hace referencia a la cantidad de meses que tiene el usuario para devolver el dinero
        period: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // interest es la tasa de interes que pone el banco (se debe poner en porcentaje sin el signo %)
        interest: {
            type: DataTypes.NUMERIC(5, 2),
            defaultValue: 0
        },
        request: {
            type: DataTypes.DATE
        },
        accepted: {
            type: DataTypes.DATE
        },
        /* cada estado tiene su caracteristica:
            under review: es cuando el usuario solicita un prestamo y debe ser revisado y aceptado por el banco,
            accepted: cuando el banco acepta el prestamo,
            in process: cuando esta en espera a ser transferido el dinero al usuario,
            completed: cuando el usuario recibio el ingreso del prestamo,
            cancelled: puede ser cuando el usuario paga todas las cuotas del prestamo, o cuando esta under review y se arrepiente del prestamo.
        */
        status: {
            type: DataTypes.ENUM(['under review', 'accepted','in process', 'completed', 'cancelled'])
        },
        // collect es un array de fechas en las que debe pagar cada cuota
        collect: {
            type: DataTypes.ARRAY(DataTypes.DATE)
        },
        // totalDue es un valor virtual (no se guarda en la base de datos)
        // donde se obtiene el total a pagar con la tasa de interes.
        totalDue: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.amount * (this.interest/100 + 1);
            },
        },
        // installments son las cuotas mensuales que debe pagar el usuario
        // tambien es un valor virtual 
        installments: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.totalDue / period;
            },
        },
    },
    { 
        timestamps: true,
        createdAt: "request", // createdAt va a aparecer como request
        updatedAt: false, // updatedAt no va a aparecer
    });
};