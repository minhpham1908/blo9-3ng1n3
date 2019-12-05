const mysql = require("mysql")
var getdate = require("./getdatemodule")
var info = {
    host: "localhost",
    user: "root",
    password: "minh1998",
    database: "blogdb"
}
var connection = mysql.createConnection(info)

//create a post
//create a new reocord in PostTag Table by postId
//luu bai viet duoi dang markdown


function connect2db() {
    return new Promise((resolve, reject) => {
        con.connect((error) => {
            if (error) reject(error)
            resolve("Connected!")
        })
    })
}

function getPosts() {
    var sqlQuery = "sselect * from post"
    return new Promise(function (resolve, reject) {
        con.query(sqlQuery, function (err, results, fields) {
            if (err) reject(err)
            var string = JSON.stringify(results);
            var posts = JSON.parse(string);
            posts.forEach(post => {
                post.dateCreated = getdate(posts.dateCreated)
            });
            resolve(posts)
        })
    })
}

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
async function getThePost(link) {
    //get post info
    try {
        var postInfo = await getPostInfo(link);
        postInfo = await getPostTagInfo(postInfo.postId)
        return new Promise.resolve(postInfo)
    } catch (error) {
        return new Promise.reject(error)
    }
    //get post taginfo
}

function getAllTags() {
    var sqlQuery = "select * from Tag"
    con.query(sqlQuery, function(err, results, fields){
        if (err) reject(err)
        results = JSON.stringify(results);
        results = JSON.parse(results);
        resolve(results)
    })
}

function getPostsByTag(tagId) {
    var sqlQuery = `select * from Tag, Posttag, Post where Tag.tagId = Postag.tagId and Posttag.postId = post.postId and Tag.tagId = "${tagId}"`
    con.query(sqlQuery, function(err, results, fields){
        if (err) reject(err)
        results = JSON.stringify(results);
        results = JSON.parse(results);
        resolve(results)
    })
}


function connect() {
    return new Promise(function (resolve, reject) {
        resolve("Connected")
    })
}
