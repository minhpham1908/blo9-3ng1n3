var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport')
var config = require('./_config')
var sqlUtil = require('../sql')

passport.serializeUser((user, done) => {
    done(null, user.idUser)
})

passport.deserializeUser(async (idUser, done) => {
    var user = await sqlUtil.getUser(idUser)
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
}, async (accessToken, refreshToken, profile, done) => {
    console.log('passport callback function')
    var id = profile.id
    var username = profile.displayName
    console.log(profile)
    var result = await sqlUtil.findUserById(id)
    if (result === 0) {
        //create new User
        await sqlUtil.createUser(id, username)
        user = {
            idUser: id.toString(),
            username: displayName
        }
        done(null, user)
    } else {
        //lay tt user ra
        var user = await sqlUtil.getUser(id)
        console.log(user)
        done(null, user)
    }
}
))