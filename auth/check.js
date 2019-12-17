function authCheck(req, res, next) {
    if(!req.user) {
        res.redirect('auth/google')
    } else {
        next()
    }
}