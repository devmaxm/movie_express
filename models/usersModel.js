const sequelize = require('../config/db.config')
const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')

const User = sequelize.define('users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: {
            type: DataTypes.STRING,
            require: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        refreshToken: {
            type: DataTypes.STRING
        },
        googleId: {
            type: DataTypes.STRING
        }
    }
)

//HOOKS
User.beforeCreate(async (user, options) => {
    if (user.password) user.password = await bcrypt.hash(user.password, process.env.BCRYPT_SALT * 1)

})
User.beforeUpdate(async (user, options) => {
    if (user._previousDataValues.refreshToken !== user.refreshToken) {
        user.refreshToken = await bcrypt.hash(user.refreshToken, process.env.BCRYPT_SALT * 1)
    }
})

// INSTANCE METHODS
User.prototype.comparePassword = async function (password) {
    if (this.password) {
        return await bcrypt.compare(password, this.password)
    }
    return false
}

User.prototype.compareTokens = async function (token) {
    return await bcrypt.compare(token, this.refreshToken)
}

module.exports = User