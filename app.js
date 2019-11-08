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
    host: "14.248.16.234",
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
marked.setOptions({
    renderer: new marked.Renderer()
})

app.get("/", function (req, res) {
    var posts;
    var postsQuery = "select * from post"
    connection.query(postsQuery, (err, results) => {
        if (err) throw err;
        var string = JSON.stringify(results);
        posts = JSON.parse(string);
        // console.log(posts)
        res.render("home", { posts: posts })
    })


})

app.get("/about", (req, res) => {
    res.render("404")
})



app.get("/post", (req, res) => {
    res.redirect("/")
})

app.get("/post/:postLink", async (req, res) => {
    console.log(req.params)
    var link = req.params.postLink;
    var path = __dirname + "/posts/" + link + ".md"
    //info lấy từ file md hoặc mysql
    //Trong project 1 thì sẽ trích file từ mysql
    var sqlquery = `select * from Post, posttag where post.postId = posttag.postId and post.path = '${link}'`
    console.log(sqlquery)

    postInfo = {
        title: "hello1",
        date: "06 Feb 2012",
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Officiis similique voluptatibus ab cumque, voluptatem enim commodi architecto maxime ipsa odit error ea esse libero eos rerum? Reprehenderit, consectetur! Perferendis praesentium nam blanditiis sint voluptates ullam quos ex a illo tenetur.",
    }

    connection.query(sqlquery, await( (err, results) => {
        if (err) throw err;
        var string = JSON.stringify(results);
        postInfo = JSON.parse(string)[0];
        console.log(postInfo)
    }))
    fs.open(path, 'r', err => {
        if (err) {
            console.log(err)
            res.render("404")
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
    var message = "Sorry, page not found... What are you doing with your life?";
    res.send(message)
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
