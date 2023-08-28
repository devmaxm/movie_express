const {Router} = require('express')
const authRouter = require('./authRouter')
const genreRouter = require('./genreRouter')
const productionCompaniesRouter = require('./productionCompaniesRouter')
const movieRouter = require('./movieRouter')
const reviewRouter = require('./reviewRouter')

const routes = Router()

routes.use('/auth', authRouter)
routes.use('/genre', genreRouter)
routes.use('/prod-companies', productionCompaniesRouter)
routes.use('/movies', movieRouter)
routes.use('/reviews', reviewRouter)

module.exports = routes
