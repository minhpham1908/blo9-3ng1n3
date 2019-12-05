var fs = require("fs")
var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var mysql = require("mysql")
var marked = require("marked")
var favicon = require('serve-favicon')
var path = require("path")
var getdate = require("./getdatemodule")
var getPost = require("./test")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(favicon(path.join(__dirname, "public", "favicon", "favicon.ico")))

var info = {
    host: "14.231.30.163",
    user: "root",
    password: "minh1998",
    database: "blogdb"
}

// var connection = mysql.createConnection(info)
// connection.connect((error) => {
//     if (error) throw error;
//     console.log("connected");

// });


// fs.readFile(__dirname + "/posts/test.md", "utf-8", (error, data) => {
//     if (error) throw error
//     dataaa = data.toString()
//     // console.log(dataaa)
// })

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



app.get("/", function (req, res) {
    var posts;
    var postsQuery = "select * from post"
    connection.query(postsQuery, (err, results) => {
        if (err) throw err;
        var string = JSON.stringify(results);
        posts = JSON.parse(string);
        posts.forEach(post => {
            post.dateCreated = getdate(posts.dateCreated)
        });
        // console.log(posts)
        res.render("home", { posts: posts })
    })


})

app.get("/about", (req, res) => {
    res.render("notfound")
})



app.get("/post", (req, res) => {
    res.redirect("/")
})

app.get("/post/:postLink", (req, res) => {
    console.log("PARAM:", req.params)
    var link = req.params.postLink;
    var path = __dirname + "/posts/" + link + ".md"


    getPost.getPost(link).then(postInfo => {
        fs.open(path, 'r', err => {
            if (err) {
                console.log(err)
                res.render("notfound")
            } else {
                var data = fs.readFileSync(path, "utf-8")
                data = data.toString();
                data = marked(data, (err, result) => {
                    if (err) throw err
                    postInfo.content = result;
                    res.render("post-page", { postInfo: postInfo })
                })
            }
        })
    })
})

app.get("/tags/", function(req,res) {
    
    res.render("notfound")
})

app.get("/tags/:tag", async function(req,res) {
    console.log("Param:", req.params)
    var tag = req.params.tag;
    var allTags = await getAllTags();
    res.render("tags", {tag: tag, tags: allTags});
})

app.get("*", function (req, res) {
    res.render("notfound")
})

app.listen(3000, "localhost", function () {
    console.log("Listening on port 3000");
})

// connection.end(function(err) {
//     if (err) {
//       return console.log('error:' + err.message);
//     }
//     console.log('Close the database connection.');
//   });
