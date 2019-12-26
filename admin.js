var express = require("express")
var fs  = require("fs")
var bodyParser = require("body-parser")
var app = express()
var sqlUtil = require("./sql")
var marked = require("marked")
var favicon = require('serve-favicon')
var path = require("path")
var postUtil = require('./postUtil')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("public"));
app.set("view engine", "ejs")
app.use(favicon(path.join(__dirname, "public", "favicon", "favicon.ico")))

//setup marked
var renderer = new marked.Renderer()

//overriding

renderer.link = (href) => {
    var id = href.substring(1)
    return `<a href="${href}" id="${id}"></a>`
}
marked.setOptions({
    renderer: renderer,
    headerIds: false
})

app.get("/", async function(req, res) {
    var posts = await sqlUtil.getPosts();
    res.render("admin-home",{ posts: posts })
})

app.get("/newpost", function(req, res ){
    res.render("newpost")
})

app.get("/post/:post", async function(req, res) {
    var postLink = req.params.post
    var path = __dirname + "/posts/" + postLink + ".md"
    var postInfo = await sqlUtil.getThePost(postLink)
    console.log(postInfo)
    var data = fs.readFileSync(path, "utf-8")
    data = data.toString();
    data = marked(data, (err, result) => {
        if (err) throw err
        postInfo.content = result;
        res.render("editPost", { postInfo: postInfo })
    })
})

app.post("/newpost", async function(req, res) {
    var body = req.body
    console.log(body)
    await postUtil.postToMetadata(body)
    await postUtil.postToFileContent(body)
    res.status(200).send();
    
})

app.get("/api/tags", (req, res) => {
    query = req.query
    console.log("query:", query)
})


app.listen(3201, (err)=>{
    if(err) throw err
    console.log("listen on 3201")
})