var fs = require("fs")
var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var mysql = require("mysql")
var marked = require("marked")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

var info = {
    host: "localhost",
    user: "root",
    password: "minh1998",
    database: "blogdb"
}

// var connection = mysql.createConnection(info)
// connection.connect((error) => {
//     if (error) throw error;
//     console.log("connected");
// });
var dataaa = ""
fs.readFile(__dirname + "/posts/test.md", "utf-8", (error, data) => {
    if (error) throw error
    dataaa = data.toString()
    console.log(dataaa)
})
marked.setOptions({
    renderer: new marked.Renderer()
})



app.get("/", function (req, res) {
    var posts;
    var postsQuery = "select title, date from post, postactiondate where post.postId = postactiondate.postId"
    connection.query(postsQuery, (err, results) => {
        if (err) throw err;
        var string = JSON.stringify(results);
        posts = JSON.parse(string);
        res.render("home", { posts: posts })
    })


})

app.get("/post", (req, res) => {
    res.render("post-page")
})





app.get("*", function (req, res) {
    var message = "Sorry, page not found... What are you doing with your life?";
    res.send(message)
})
app.listen(3000, "localhost", function () {
    console.log("Listening on port 3000");
})


// connection.end(function(err) {
//   if (err) {
//     return console.log('error:' + err.message);
//   }
//   console.log('Close the database connection.');
// });