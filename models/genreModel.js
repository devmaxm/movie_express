const sequelize = require('../config/db.config')
const {DataTypes} = require('sequelize')

const Genre = sequelize.define('genres', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        require: true,
        allowNull: false
    }
})

module.exports = Genre