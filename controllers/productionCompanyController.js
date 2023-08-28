const catchAsync = require('../utils/catchAsync')
const ProductionCompany = require('../models/productionCompanyModel')
const AppError = require("../exception/AppError");

const createOne = catchAsync(async (req, res, next) => {
    const doc = await ProductionCompany.create(req.body)
    return res.status(201).json({
        status: 'success',
        result: doc
    })
})

const deleteOne = catchAsync(async (req, res, next) => {
    const {id} = req.params
    if (!await ProductionCompany.destroy({where: {id}})) {
        return next(AppError.NotFound())
    }

    return res.status(204).json({status: 'success'})
})

const updateOne = catchAsync(async (req, res, next) => {
    const productionCompany = await ProductionCompany.findOne({where: {id: req.params.id}})
    if (productionCompany) {
        return next(AppError.NotFound())
    }
    await productionCompany.update(req.body)
    return res.status(201).json({
        status: 'success',
        result: productionCompany
    })
})

const getOne = catchAsync(async (req, res, next) => {
    const productionCompany = await ProductionCompany.findOne({where: {id: req.params.id}})
    if (productionCompany) {
        return next(AppError.NotFound())
    }
    return res.status(201).json({
        status: 'success',
        result: productionCompany
    })
})

const getAll = catchAsync(async (req, res, next) => {
    const productionCompanies = await ProductionCompany.findAndCountAll()
    return res.status(201).json({
        status: 'success',
        result: productionCompanies
    })
})



module.exports = {
    createOne,
    deleteOne,
    updateOne,
    getOne,
    getAll
}
