const User = require("../models/usersModel");
const authController = require('../controllers/authController')

const setAuthCookiesMiddleware = async (req,res, next) => {
    if (req.user) {
        const authResponse = await authController.generateUserResponseAndRefreshTokens(await User.findOne({where: {id: req.user.user.id}}))
        await authController.setAuthCookies(res, authResponse.accessToken, authResponse.refreshToken)
    } else {
        res.clearCookie('jwtAccess')
        res.clearCookie('jwtRefresh')
    }
    next()
}

module.exports = setAuthCookiesMiddleware