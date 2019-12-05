var express = require("express")
var bodyParser = require("body-parser")
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("public"));
app.set("view engine", "ejs")

app.get("/", function(req, res) {

})

app.post("/login",function(req, res) {
    var body = req.body
    console.log(body)
    res.send("ok")
})

app.listen(3000, (err)=>{
    if(err) throw err
    console.log("listen on 3000")
})