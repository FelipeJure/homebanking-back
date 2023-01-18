const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('users', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
// el token deberia venir de la libreria bcrypt
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
// ver si es compatible ya que donde dice null, deberia ir la longitud del numero
        money: {
            type: DataTypes.FLOAT(null,2),
            allowNull: false,
            defaultValue: 0
        }
    });
};
