require('dotenv').config()
const express = require('express')
const routes = require('./routes/index')
const AppError = require('./exception/AppError')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const exceptionsMiddleware = require('./middlewares/exceptions.middleware')
const passport = require('passport')

// models
require('./models/movieModel')
require('./models/genreModel')
require('./models/productionCompanyModel')
require('./models/reviewModel')
require('./models/assotiations')


//passport
require('./strategies/google-oauth2.strategy')


const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

// ROUTES
app.use('/api', routes)

// ERRORS
app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 400))
})
app.use(exceptionsMiddleware)

module.exports = app