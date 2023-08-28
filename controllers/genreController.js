const catchAsync = require('../utils/catchAsync')
const Genre = require('../models/genreModel')
const AppError = require('../exception/AppError')

const createOne = catchAsync(async (req, res, next) => {
    const doc = await Genre.create(req.body)
    return res.status(201).json({
        status: 'success',
        result: doc
    })
})

const deleteOne = catchAsync(async (req, res, next) => {
    const {id} = req.params
    if (!await Genre.destroy({where: {id}})) {
        return next(AppError.NotFound())
    }

    return res.status(204).json({status: 'success'})
})

const updateOne = catchAsync(async (req, res, next) => {
    const genre = await Genre.findOne({where: {id: req.params.id}})
    if (!genre) {
        return next(new AppError('Document not found', 404))
    }
    await genre.update(req.body)
    return res.status(201).json({
        status: 'success',
        result: genre
    })
})

const getOne = catchAsync(async (req, res, next) => {
    const genre = await Genre.findOne({where: {id: req.params.id}})
    if (!genre) {
        return next(new AppError('Document not found', 404))
    }
    return res.status(200).json({
        status: 'success',
        result: genre
    })
})

const getAll = catchAsync(async (req, res, next) => {
    const genres = await Genre.findAndCountAll()
    return res.status(200).json({
        status: 'success',
        result: genres
    })
})

module.exports = {
    createOne,
    deleteOne,
    updateOne,
    getOne,
    getAll
}


