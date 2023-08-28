const User = require('../models/usersModel')
const {Op} = require('sequelize')
const AppError = require('../exception/AppError')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')

const generateUserResponseAndRefreshTokens = async (user) => {
    const accessToken = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRES * 60 * 1000 // env variable value in minutes
        }
    )
    const refreshToken = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES * 24 * 60 * 60 * 1000 // env variable value in days
        }
    )
    user.refreshToken = refreshToken
    await user.save()

    delete user.dataValues.password
    delete user.dataValues.createdAt
    delete user.dataValues.updatedAt
    delete user.dataValues.refreshToken

    return {
        user,
        accessToken,
        refreshToken
    }
}

const setAuthCookies = async (res, accessToken, refreshToken) => {
    const cookieOptions = {
        httpOnly: true,
        secure: false
    };
    const accessOptions = {
        ...cookieOptions,
        expires: new Date(
            Date.now() + process.env.JWT_ACCESS_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // env should be in days
        )
    }

    const refreshOptions = {
        ...cookieOptions,
        expires: new Date(
            Date.now() + process.env.JWT_REFRESH_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // env should be in days
        )
    }

    res.cookie('jwtAccess', accessToken, accessOptions)
    res.cookie('jwtRefresh', refreshToken, refreshOptions)
}

const register = catchAsync(async (req, res, next) => {
    const {fullName, email, password, passwordConfirm} = req.body
    if (!email || !password || !passwordConfirm) {
        return next(AppError.BadRequest('Please fill all fields!'))
    }
    const candidate = await User.findAll({
        where: {
            [Op.or]: [
                {email},
            ]
        }
    })
    if (candidate.length > 0) {
        return next(AppError.BadRequest('User with this email is already exist.'))
    }

    if (password !== passwordConfirm) {
        return next(AppError.BadRequest('Password mismatch.'))
    }

    const user = await User.create({fullName, email, password})
    const authResponse = await generateUserResponseAndRefreshTokens(user)
    await setAuthCookies(res, authResponse.accessToken, authResponse.refreshToken)
    return res.status(200).json(authResponse)
})

const login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body
    if (!email || !password) return next(AppError.BadRequest('Please fill all fields!'))
    const candidate = await User.findOne({
        where: {
            email
        }
    })
    if (!candidate) return next(AppError.BadRequest('User does not exist!'))
    if (!await candidate.comparePassword(password)) return next(AppError.BadRequest('Wrong password!'))
    return res.status(200).json(await generateUserResponseAndRefreshTokens(candidate))
})

const currentUser = catchAsync(async (req, res, next) => {
    return res.status(200).json(await generateUserResponseAndRefreshTokens(req.user))
})

const refreshToken = catchAsync(async (req, res, next) => {
    const user = await User.findOne({where: req.user.id})
    if (!await user.compareTokens(req.headers.authorization.split(' ')[1])) {
        return next(AppError.Unauthorized())
    }
    return res.status(200).json(await generateUserResponseAndRefreshTokens(user))
})


module.exports = {
    register,
    login,
    currentUser,
    refreshToken,
    generateUserResponseAndRefreshTokens,
    setAuthCookies
}