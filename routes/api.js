var express = require('express')
var sqlUtil = require('../sql')
var router = express.Router()

router.post('/post/:postLink',async (req, res, next) => {
    //check postLink is right?
    var postLink = req.params.postLink
    console.log(req.body)
    // var date = new Date(req.body.date)
    // console.log(date)
    var post = await sqlUtil.getThePost(postLink)
    //check session
    console.log(post)
    //store comment
    // var code = await sqlUtil.storeComment(post.postID, userID, date, content)
    //send back response
    res.status(200).send()
})

module.exports = router