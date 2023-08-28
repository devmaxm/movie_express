const {Router} = require('express')
const authController = require('../controllers/authController')
const passport = require('passport')
const onlyAuthMiddleware = require('../middlewares/onlyAuth.middleware')
const authCookiesMiddleware = require('../middlewares/setAuthCookies.middleware')

const authRouter = Router()

// JWT AUTH
authRouter.route('/register').post(authController.register)
authRouter.route('/login').post(authController.login)
authRouter.route('/refresh-token').put(
    onlyAuthMiddleware('refresh'),
    authController.refreshToken
)

// GOOGLE AUTH
authRouter.get('/google', (req, res, next) => {
    next()
}, passport.authenticate('google', {scope: ['profile', 'email']}));

authRouter.get('/google/callback', passport.authenticate('google', {
        session: false,
    }), authCookiesMiddleware, (req, res) => {
        if (req.user) {
            res.redirect('/api/auth/me')
        } else {
            res.redirect('api/auth/google/failure')
        }
    }
);

authRouter.get('/google/failure', (req, res) => {
    return res.send('fail')
})


authRouter.route('/me').get(
    onlyAuthMiddleware('access'),
    authController.currentUser
)


module.exports = authRouter