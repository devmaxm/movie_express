const catchAsync = require('../utils/catchAsync')
const User = require('../models/usersModel')
const AppError = require('../exception/AppError')

const createOne = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body)
    return res.status(201).json({
        status: 'success',
        result: user
    })
})

const deleteOne = catchAsync(async (req, res, next) => {
    const user = await User.findOne({where: {id: req.params.id}})
    if (!user) {
        return next(AppError.NotFound())
    }
    await user.destroy()
    return res.status(204).json({status: 'success'})
})

const updateOne = catchAsync(async (req, res, next) => {
    const user = await User.findOne({where: {id: req.params.id}})
    if (!user) {
        return next(AppError.NotFound())
    }
    await user.update(req.body)
    return res.status(201).json({
        status: 'success',
        result: user
    })
})

const getOne = catchAsync(async (req, res, next) => {
    const user = await User.findOne({where: {id: req.params.id}})
    if (!user) {
        return next(AppError.NotFound())
    }
    return res.status(201).json({
        status: 'success',
        result: user
    })
})

const getAll = catchAsync(async (req, res, next) => {
    const users = await User.findAndCountAll()

    return res.status(201).json({
        status: 'success',
        result: users
    })
})

module.exports = {
    createOne,
    deleteOne,
    updateOne,
    getOne,
    getAll
}
