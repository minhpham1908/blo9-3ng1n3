var express = require('express')
var router = express.Router()
var sqlUtil = require("../sql")


router.get('/', async function (req, res, next) {
    var posts = await sqlUtil.getPosts();
    console.log(req.session)

    res.render("home", { posts: posts, user: req.user })
})



module.exports = router