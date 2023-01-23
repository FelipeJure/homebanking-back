const { DataTypes } = require('sequelize');
const md5 = require('md5');

module.exports = (sequelize) => {
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            set(value) {
                this.setDataValue('password', md5(value));
            },
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'client'),
            defaultValue: 'client'
        },
        identity: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { 
        timestamps: true,
        createdAt: "created_date", // createdAt va a aparecer como created_date
        updatedAt: "updated_at", // updatedAt va a aparecer como  updated_at
    });
};
