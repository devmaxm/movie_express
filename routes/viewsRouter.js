const {Router} = require('express')
const viewsController = require('../controllers/viewsController')
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';
const setUserMiddleware = require('../middlewares/setUser.middleware')

const viewsRouter = Router()

viewsRouter.use((req, res, next)=>{
    res.locals.imageBaseUrl = imageBaseUrl;
    next()
})
viewsRouter.use(setUserMiddleware)


viewsRouter.get('', viewsController.indexPage)
viewsRouter.get('/movie/:id', viewsController.getMovieById)
viewsRouter.post('/search', viewsController.search)
viewsRouter.get('/favorites', viewsController.favorites)

module.exports = viewsRouter