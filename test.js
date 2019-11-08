var fs = require('fs');
var marked = require("marked")

var mysql = require("mysql")
// const renderer = new marked.Renderer()
// marked.setOptions({
//     renderer : renderer
// })

// fs.readFile(__dirname + "/posts/test.md", 'utf8', (error, data) => {
//     if (error) throw error
//     var lexedString = marked.lexer(data)

//     var html = marked.parser(lexedString)
//     fs.writeFile("test.html", html, 'utf8', (err)=> {
//         if(err) throw err
//     })
// })
var info = {
    host: "14.248.16.234",
    user: "root",
    password: "minh1998",
    database: "blogdb",
    port: "3306"
}
var connection = mysql.createConnection(info)
connection.connect((error) => {
    if (error) throw error;
    console.log("connected");
});

