const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/usersModel')
const {generateUserResponseAndRefreshTokens} = require('../controllers/authController')

passport.use(new GoogleStrategy({
        clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/api/auth/google/callback",
        passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, cb) {
        // console.log(1)
        const user = await User.findOne({
                where: {
                    googleId: profile.id
                }
            }
        )
        // create new user if new
        if (!user) {
            const newUser = await User.create({
                email: profile.emails[0].value,
                googleId: profile.id,
                fullName: profile.displayName
            })

            return cb(null, await generateUserResponseAndRefreshTokens(newUser))
        }
        return cb(null, await generateUserResponseAndRefreshTokens(user))
    }
));

passport.serializeUser(function (user, done) {

    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});