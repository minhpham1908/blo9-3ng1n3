var express = require('express')
var router = express.Router()
var passport = require('passport')


router.get('/google', passport.authenticate('google', { scope: ['openid', 'profile'] }))

router.get('/google/callback', 
passport.authenticate('google'),
(req, res) => {
    console.log(req.user)
    req.logout
    res.redirect('/')
})

module.exports = router