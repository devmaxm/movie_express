const {Router} = require('express')
const genreController = require('../controllers/genreController')

const genreRouter = Router()

genreRouter.route('/')
    .get(genreController.getAll)
    .post(genreController.createOne)

genreRouter.route('/:id')
    .get(genreController.getOne)
    .delete(genreController.deleteOne)
    .put(genreController.updateOne)

module.exports = genreRouter