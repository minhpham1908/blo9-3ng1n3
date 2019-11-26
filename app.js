var fs = require("fs")
var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var mysql = require("mysql")
var marked = require("marked")
var favicon = require('serve-favicon')
var path = require("path")
var getdate = require("./getdatemodule")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(favicon(path.join(__dirname,"public","favicon","favicon.ico")))

var info = {
    host: "localhost",
    user: "root",
    password: "minh1998",
    database: "blogdb"
}

var connection = mysql.createConnection(info)
connection.connect((error) => {
    if (error) throw error;
    console.log("connected");
});


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
    console.log("PARAM:",req.params)
    var link = req.params.postLink;
    var path = __dirname + "/posts/" + link + ".md"
    
    var postInfo = {
        postId: 3,
        title: "hello1",
        path: 'tong-quan-phan-tich-chuong-trinh-dich',
        dateCreated: "06 Feb 2012",
        summary: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Officiis similique voluptatibus ab cumque, voluptatem enim commodi architecto maxime ipsa odit error ea esse libero eos rerum? Reprehenderit, consectetur! Perferendis praesentium nam blanditiis sint voluptates ullam quos ex a illo tenetur.",
        tags: []
    }
    //info lấy từ file md hoặc mysql
    //Trong project 1 thì sẽ trích file từ mysql
    var getpostInfoQuery = `select * from Post where post.path = '${link}'`
    connection.query(getpostInfoQuery, ((err, results) => {
        if (err) throw err;
        var string = JSON.stringify(results);
        postInfo = JSON.parse(string)[0];
        postInfo.dateCreated = getdate(postInfo.dateCreated,"DD MMM YYYY")
        console.log(postInfo)
    }))
    // var getpostTagsQuery = `select * from posttag where postid = '${postInfo.postId}'`
    // var x = connection.query(getpostTagsQuery,((err, results) => {
    //     if (err) throw err;
    //     console.log(results)
    // }))
    // console.log("x:",x.results)
    fs.open(path, 'r', err => {
        if (err) {
            console.log(err)
            res.render("notfound")
        } else {
            fs.readFile(path, "utf-8", (error, data) => {
                if (error) throw error
                data = data.toString()
                // console.log(dataaa)
                data = marked(data, (err, result) => {
                    if (err) throw err
                    postInfo.content = result;
                    res.render("post-page", { postInfo: postInfo })
                })
            })
        }

    })
    //tìm file theo link trong thư mục ./posts/
    // chuyển markdown sang html
    //chèn vào trang post



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

function getPost(link) {
    
}