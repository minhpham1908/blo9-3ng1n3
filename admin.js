var express = require("express")
var bodyParser = require("body-parser")
var app = express()
var sqlUtil = require("../sql")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("public"));
app.set("view engine", "ejs")

app.get("/", async function(req, res) {
    var posts = await sqlUtil.getPosts();
    res.render("home",{ posts: posts })
})

app.post("/",function(req, res) {
    var body = req.body
    console.log(body)
    res.send("ok")
})

app.listen(3200, (err)=>{
    if(err) throw err
    console.log("listen on 3200")
})