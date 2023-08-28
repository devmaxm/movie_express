const {Router} = require('express')
const reviewController = require('../controllers/reviewController')
const onlyAuthMiddleware = require('../middlewares/onlyAuth.middleware')

const reviewRouter = Router({mergeParams: true})

reviewRouter.route('/')
    .post(
        onlyAuthMiddleware('access'),
        reviewController.createOne
    )
    .get(reviewController.getAll)

reviewRouter.use(onlyAuthMiddleware('access'))
reviewRouter.route('/:id')
    .get(reviewController.getOne)
    .put(reviewController.updateOne)
    .delete(reviewController.deleteOne)

module.exports = reviewRouter