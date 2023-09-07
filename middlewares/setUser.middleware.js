const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");


const setUserMiddleware = async (req, res, next) => {
    try {
        let token
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1]
        } else if (req.cookies.jwtAccess) {
            token = req.cookies.jwtAccess
        } else if (req.cookies.jwtRefresh) {
            token = req.cookies.jwtRefresh
        }

        const secretKey = process.env.JWT_ACCESS_SECRET
        const decoded = jwt.verify(token, secretKey)
        if (!decoded) {
            res.locals.user = undefined
        }

        res.locals.user = await User.findOne({where: {id: decoded.id}})
        next()
    } catch (e) {
        res.locals.user = undefined
        next()
    }
}

module.exports = setUserMiddleware