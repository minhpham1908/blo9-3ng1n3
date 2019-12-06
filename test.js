var fs = require('fs');
var marked = require("marked")

var mysql = require("mysql")
var getdate = require("./getdatemodule")
var sqlUtil = require("./sql")

var info = {
    host: "localhost",
    user: "root",
    password: "minh1998",
    database: "blogdb",
    port: "3306"
}

var postInfo = {
    postId: 0,
    title: "Temp title",
    path: 'temp',
    dateCreated: "01 Jan 1970",
    summary: "Chua co gi",
    tags: ["nothing"]
}

sqlUtil.connect2db()
async function he(tagId) {
    // var tags = await sqlUtil.getAllTags()
    var tags = await sqlUtil.getPosts()
    console.log("TAGS:", tags)
    // console.log("POSTS:", posts)
    // var numberofPost =posts.length
}
he()
sqlUtil.end()
// var data = fs.readFileSync(path, "utf-8")

// console.log(typeof data)


// module.exports.getPost = getPost;





