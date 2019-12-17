var express = require('express')
var router = express.Router()
var sqlUtil = require("../sql")


router.get('/', async function (req, res,next) {
    var posts = await sqlUtil.getPosts();
    console.log(req.user)
    res.render("home", { posts: posts })
})



module.exports = router