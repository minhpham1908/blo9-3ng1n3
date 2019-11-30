var fs = require('fs');
var marked = require("marked")

var mysql = require("mysql")
var getdate = require("./getdatemodule")
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
    host: "14.231.30.163",
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
var connection = mysql.createConnection(info)
function getPostInfo(link) {
    return new Promise(function (resolve, reject) {
        var getpostInfoQuery = `select * from Post where post.path = '${link}'`;
        connection.query(getpostInfoQuery, function (err, results, fields) {
            if (err) reject(err);
            var string = JSON.stringify(results);
            postInfo = JSON.parse(string)[0];
            postInfo.dateCreated = getdate(postInfo.dateCreated, "DD MMM YYYY")
            resolve(postInfo)
        })
    })
}

function getPostTagInfo(postId) {
    return new Promise(function (resolve, reject) {
        var getpostTagsQuery = `select * from posttag, tag where posttag.postid = '${postId}' and posttag.tagid = tag.tagid`
        connection.query(getpostTagsQuery, ((err, results, field) => {
            if (err) reject(err);
            var tags = []
            var results = JSON.stringify(results);
            results = JSON.parse(results);
            results.forEach(element => {
                tags.push(element.tag)
            });
            postInfo.tags = tags
            resolve(postInfo)
        }))
    })
}


async function getPost(link) {
    try {
        
        var postinfo = await getPostInfo(link)
        postinfo = await getPostTagInfo(postinfo.postId)
        return postinfo
    } catch (error) {
        console.log('Error!', error);

    }

}

module.exports = getPost;




