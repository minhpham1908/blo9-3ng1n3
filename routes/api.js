var express = require('express')
var sqlUtil = require('../sql')
var router = express.Router()

//Comment
router.post('/post/:postLink', async (req, res, next) => {
    var postLink = req.params.postLink
    var content = req.body.content
    var date = new Date(req.body.date)
    var post = await sqlUtil.getThePost(postLink)
    var postId = post.postId
    var userId = '0'
    if (req.session.passport.user) {
        userId = req.session.passport.user
    }
    var code = await sqlUtil.storeComment(postId, userId, date, content)
    res.status(200).send()
})

module.exports = router