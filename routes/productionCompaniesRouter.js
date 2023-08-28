const {Router} = require('express')
const productionCompanyController = require('../controllers/productionCompanyController')

const productionCompaniesRouter = Router()

productionCompaniesRouter.route('/')
    .get(productionCompanyController.getAll)
    .post(productionCompanyController.createOne)

productionCompaniesRouter.route('/:id')
    .get(productionCompanyController.getOne)
    .put(productionCompanyController.updateOne)
    .delete(productionCompanyController.deleteOne)

module.exports = productionCompaniesRouter