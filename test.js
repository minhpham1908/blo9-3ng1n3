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

// sqlUtil.connect2db()
async function he(tagId) {
    // var tags = await sqlUtil.getAllTags()
    // var result = await sqlUtil.createUser('113486703879106033181','Minh Pham')
    // result = await sqlUtil.createUser('113486703879106033183','Minh Pham')
    result = await sqlUtil.findUserById(0)
    console.log("REsult:", result)
    sqlUtil.end()
    // var numberofPost =posts.length
}
he()



// var data = fs.readFileSync(path, "utf-8")

// console.log(typeof data)


// module.exports.getPost = getPost;



