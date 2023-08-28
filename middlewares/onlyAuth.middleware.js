const AppError = require('../exception/AppError')
const User = require('../models/usersModel')
const jwt = require('jsonwebtoken')

const onlyAuthMiddleware = (type) => async (req, res, next) => {
    try {
        let token
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1]
        } else if (req.cookies.jwtAccess) {
            token = req.cookies.jwtAccess
        } else if (req.cookies.jwtRefresh) {
            token = req.cookies.jwtRefresh
        }

        const secretKey = type === 'access' ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET
        const decoded = jwt.verify(token, secretKey)
        if (!decoded) {
            return next(AppError.Unauthorized())
        }

        req.user = await User.findOne({where: {id: decoded.id}})
        if (!req.user) {
            return next(AppError.Unauthorized())
        }
        next()
    } catch (e) {
        return next(AppError.Unauthorized())
    }
}

module.exports = onlyAuthMiddleware