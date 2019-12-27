var express = require('express')
var sqlUtil = require('../sql')
var router = express.Router()
var dateFormat = require('../getdatemodule')

router.post('/', async (req, res, next) => {
    var userID = '0'
    var user = await sqlUtil.getUser(userID)
    res.status(200).send({ user: user.username })
})
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
    var user = await sqlUtil.getUser(userId)

    res.status(200).send({ username: user.username, date: dateFormat(date, "hh:mm:ss A DD/MM/YYYY"), content: content })
})




module.exports = router