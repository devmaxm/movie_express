const sequelize = require('../config/db.config')
const {DataTypes} = require('sequelize')

const ProductionCompany = sequelize.define('production_companies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    logoPath: {
        type: DataTypes.STRING,
        defaultValue: 'company_default.jpg'
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    originCountry: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = ProductionCompany