const catchAsync = require('../utils/catchAsync')
const Movie = require('../models/movieModel')
const AppError = require('../exception/AppError')
const Genre = require('../models/genreModel')
const ProductionCompany = require('../models/productionCompanyModel')
const {Op} = require('sequelize')

// convert query object to where filter
function convertObjectToFilter(object) {
    const operatorMap = {
        eq: Op.eq,
        ne: Op.ne,
        gt: Op.gt,
        gte: Op.gte,
        lt: Op.lt,
        lte: Op.lte,
        like: Op.like,
        notLike: Op.notLike,
    };

    const filter = {};
    for (const field in object) {
        const operators = object[field];
        for (const operator in operators) {
            if (operatorMap[operator]) {
                filter[field] = {
                    ...filter[field],
                    [operatorMap[operator]]: operators[operator],
                };
            } else {
                filter[field] = object[field]
            }
        }
    }

    return filter;
}

const createOne = catchAsync(async (req, res, next) => {
    const {genreIds, companyIds, ...data} = req.body

    const movie = await Movie.create(data)

    for (const companyId of companyIds) {
        const productionCompany = await ProductionCompany.findOne({where: {id: companyId}})
        movie.addProductCompanies(productionCompany)
    }


    for (const genreId of genreIds) {
        const genre = await Genre.findOne({where: {id: genreId}})
        await movie.addGenres(genre)
    }

    return res.status(201).json({
        status: 'success',
        result: movie
    })
})

const deleteOne = catchAsync(async (req, res, next) => {
    if (!await Movie.destroy({where: {id: req.params.id}})) {
        return next(AppError.NotFound())
    }
    return res.status(204).json({status: 'success'})
})

const updateOne = catchAsync(async (req, res, next) => {
    const movie = await Movie.findOne({where: {id: req.params.id}})
    if (!movie) {
        return next(AppError.NotFound())
    }
    await movie.update(req.body)
    return res.status(201).json({
        status: 'success',
        result: movie
    })
})

const getOne = catchAsync(async (req, res, next) => {
    const movie = await Movie.findOne({
        where: {id: req.params.id},
        include: [
            {
                model: Genre,
                as: 'genres',
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                }
            },
            {
                model: ProductionCompany,
                as: 'productCompanies',
                attributes: ['id', 'name', 'logoPath', 'originCountry'],
                through: {
                    attributes: []
                }
            }
        ],
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })

    if (!movie) {
        return next(AppError.NotFound())
    }
    return res.status(201).json({
        status: 'success',
        result: movie
    })
})

const getAll = catchAsync(async (req, res, next) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const offset = (page - 1) * limit

    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(field => delete req.query[field])

    const filterObject = convertObjectToFilter(req.query)

    const movies = await Movie.findAndCountAll({
        where: filterObject,
        include: [
            {
                model: Genre,
                as: 'genres',
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                }
            },
            {
                model: ProductionCompany,
                as: 'productCompanies',
                attributes: ['id', 'name', 'logoPath', 'originCountry'],
                through: {
                    attributes: []
                }
            }
        ],
        attributes: {exclude: ['createdAt', 'updatedAt']},
        offset,
        limit
    })
    return res.status(201).json({
        status: 'success',
        result: movies
    })
})

module.exports = {
    createOne,
    deleteOne,
    updateOne,
    getOne,
    getAll
}
