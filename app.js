require('dotenv').config()
const express = require('express')
const routes = require('./routes/index')
const AppError = require('./exception/AppError')
const viewsRouter = require('./routes/viewsRouter')
const path = require('path')

const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const exceptionsMiddleware = require('./middlewares/exceptions.middleware')
const passport = require('passport')

//passport
require('./strategies/google-oauth2.strategy')


const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

// ROUTES
app.use('/api', routes)
app.use('/', viewsRouter)

// ERRORS
app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 400))
})
app.use(exceptionsMiddleware)

module.exports = app