const catchAsync = require('../utils/catchAsync')
const Review = require('../models/reviewModel')
const AppError = require('../exception/AppError')

const createOne = catchAsync(async (req, res, next) => {
    const {movieId} = req.params
    const review = await Review.create({...req.body, movieId, authorId: req.user.id})
    return res.status(201).json({
        status: 'success',
        result: review
    })
})

const deleteOne = catchAsync(async (req, res, next) => {
    const review = await Review.findOne({where: {id: req.params.id}})
    if (!review) {
        return next(AppError.NotFound())
    }
    if (review.authorId !== req.user.id) {
        return next(AppError.BadRequest('You are not an author!'))
    }
    await review.destroy()
    return res.status(204).json({status: 'success'})
})

const updateOne = catchAsync(async (req, res, next) => {
    const review = await Review.findOne({where: {id: req.params.id}})
    if (!review) {
        return next(AppError.NotFound())
    }
    if (review.authorId !== req.user.id) {
        return next(AppError.BadRequest('You are not an author!'))
    }
    await review.update(req.body)
    return res.status(201).json({
        status: 'success',
        result: review
    })
})

const getOne = catchAsync(async (req, res, next) => {
    const review = await Review.findOne({where: {id: req.params.id}})
    if (!review) {
        return next(AppError.NotFound())
    }
    return res.status(201).json({
        status: 'success',
        result: review
    })
})

const getAll = catchAsync(async (req, res, next) => {
    const {movieId} = req.params
    // get reviews related to film if movieId else it will get all comments
    const reviews = await Review.findAndCountAll(movieId && {where: {movieId}})

    return res.status(201).json({
        status: 'success',
        result: reviews
    })
})

module.exports = {
    createOne,
    deleteOne,
    updateOne,
    getOne,
    getAll
}
