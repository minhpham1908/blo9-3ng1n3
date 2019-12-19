var fs = require("fs")
var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var mysql = require("mysql")
var marked = require("marked")
var favicon = require('serve-favicon')
var path = require("path")
var sqlUtil = require("./sql")
var session = require('express-session');
var cookieSession = require('cookie-session')
var passport = require('passport')
var indexRouter = require('./routes/index')
var apiRouter = require('./routes/api')
var authRouter = require('./routes/auth')
var passportSetup = require('./auth/google')
var config = require('./auth/_config')
var logger = require('morgan')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'))
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(favicon(path.join(__dirname, "public", "favicon", "favicon.ico")))
// app.use(session({
//     secret: 'secret cat',
//     resave: true,
//     saveUninitialized: true
// }))

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.session.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())


var info = {
    host: "localhost",
    user: "root",
    password: "minh1998",
    database: "blogdb"
}


//setup marked
var renderer = new marked.Renderer()

//overriding

renderer.link = (href) => {
    var id = href.substring(1)
    return `<a href="${href}" id="${id}"></a>`
}
marked.setOptions({
    renderer: renderer,
    headerIds: true
})



sqlUtil.connect2db()



app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/api', apiRouter)

app.get("/about", (req, res) => {
    
    res.render("notfound")
})



app.get("/post", (req, res) => {
    res.redirect("/")
})

app.get("/post/:postLink", async (req, res) => {
    console.log("PARAM:", req.params)
    console.log("session:", req.session)
    console.log("user:", req.user)
    var link = req.params.postLink;
    var path = __dirname + "/posts/" + link + ".md"
    var postInfo = await sqlUtil.getThePost(link)
    var data = fs.readFileSync(path, "utf-8")
    data = data.toString();
    data = marked(data, (err, result) => {
        if (err) throw err
        postInfo.content = result;
        res.render("post-page", { postInfo: postInfo })
    })
})

app.get("/tags/", function (req, res) {
    res.render("notfound")
})

app.get("/tags/:tag", async function (req, res) {
    console.log("Param:", req.params)
    var tag = req.params.tag;
    var posts = await sqlUtil.getPostsByTag(tag)
    var tags = await sqlUtil.getNumberofTag()
    console.log(tag)
    console.log(posts)
    console.log(tags)
    res.render("tags", { tag: tag, posts: posts, tags: tags });
})

app.get("*", function (req, res) {
    res.redirect("/")
})

app.listen(3200, "localhost", function () {
    console.log("Listening on port 3200");
})

// connection.end(function(err) {
//     if (err) {
//       return console.log('error:' + err.message);
//     }
//     console.log('Close the database connection.');
//   });
