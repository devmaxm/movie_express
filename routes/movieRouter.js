const {Router} = require('express')
const movieController = require('../controllers/movieController')
const reviewRouter = require('./reviewRouter')

const movieRouter = Router()

movieRouter.use('/:movieId/reviews', reviewRouter)

movieRouter.route('/')
    .get(movieController.getAll)
    .post(movieController.createOne)

movieRouter.route('/:id')
    .get(movieController.getOne)
    .put(movieController.updateOne)
    .delete(movieController.deleteOne)


module.exports = movieRouter
