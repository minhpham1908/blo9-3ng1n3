const mysql = require("mysql")
var convertDate = require("./getdatemodule")
var moment = require("moment")
var info = {
    host: "128.199.239.13",
    port: 3306,
    user: "root",
    password: "gn1C4IrvFiGesuwK",
    database: "blogdb"
}
var con = mysql.createConnection(info)
//create a post
//create a new reocord in PostTag Table by postId
//luu bai viet duoi dang markdown


function connect2db() {
    // return new Promise((resolve, reject) => {
    //     con.connect((error) => {
    //         if (error) reject(error)
    //         resolve("Connected!")
    //     })
    // })
    con.connect()
    console.log("Connected!")
}

function getPosts() {
    var sqlQuery = "select * from post"
    return new Promise(function (resolve, reject) {
        con.query(sqlQuery, function (err, results, fields) {
            if (err) reject(err)
            var results = JSON.stringify(results);
            var posts = JSON.parse(results);
            posts.forEach(post => {
                post.dateCreated = convertDate(post.dateCreated, "DD MMM YYYY")
            });
            resolve(posts)
        })
    })
}

function getPostInfo(link) {
    return new Promise(function (resolve, reject) {
        var getpostInfoQuery = `select * from post where post.path = '${link}'`;
        con.query(getpostInfoQuery, function (err, results, fields) {
            if (err) reject(err);
            var string = JSON.stringify(results);
            postInfo = JSON.parse(string)[0];
            postInfo.dateCreated = convertDate(postInfo.dateCreated, "DD MMM YYYY")
            resolve(postInfo)
        })
    })
}

function getPostTagInfo(postId) {
    return new Promise(function (resolve, reject) {
        var getpostTagsQuery = `select * from posttag, tag where posttag.postid = '${postId}' and posttag.tagid = tag.tagid`
        con.query(getpostTagsQuery, ((err, results, field) => {
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
        return postInfo
    } catch (error) {
        return postInfo
    }
    //get post taginfo
}

function getAllTags() {
    var sqlQuery = "select * from Tag"
    return new Promise(function (resolve, reject) {
        con.query(sqlQuery, function (err, results, fields) {
            if (err) reject(err)
            results = JSON.stringify(results);
            results = JSON.parse(results);
            resolve(results)
        })
    })
}

function getNumberofTag() {
    var sqlQuery = "select tag.tagId, tag.tag, count(postId) as NumberOfPosts from tag, posttag where tag.tagId = posttag.tagId group by tag.tagId, tag.tag"
    return new Promise(function (resolve, reject) {
        con.query(sqlQuery, function (err, results, fields) {
            if (err) reject(err)
            tags = []
            results = JSON.stringify(results);
            results = JSON.parse(results);
            results.forEach(result => {
                tags.push(result)
            })
            resolve(tags)
        })
    })
}

function getPostsByTag(tag) {
    var sqlQuery = `select * from tag, posttag, post where tag.tagId = posttag.tagId and posttag.postId = post.postId and tag.tag = '${tag}'`
    return new Promise(function (resolve, reject) {
        con.query(sqlQuery, function (err, results, fields) {
            if (err) reject(err)
            posts = []
            results = JSON.stringify(results);
            results = JSON.parse(results);
            results.forEach(result => {
                posts.push(result)
            })
            resolve(posts)
        })
    })
}

function createUser(userId, username) {
    var sqlQuery = `insert into User(idUser, username) value ('${userId}', '${username}')`
    return new Promise((resolve, reject) => {
        con.query(sqlQuery, (err, results, fields) => {
            if (err) reject(err)
            resolve(`Them thanh cong nguoi dung ${username}`)
        })
    })
}

function findUserById(id) {
    var sqlQuery = `select * from User where idUser = '${id}'`
    return new Promise((resolve, reject) => {
        con.query(sqlQuery, (err, results, fields) => {
            if (err) reject(err)
            results = JSON.stringify(results);
            results = JSON.parse(results);
            resolve(results.length)

        })
    })
}

function getUser(id) {
    var sqlQuery = `select * from User where idUser = '${id}'`
    return new Promise((resolve, reject) => {
        con.query(sqlQuery, (err, results, fields) => {
            if (err) reject(err)
            results = JSON.stringify(results);
            result = JSON.parse(results)[0];
            resolve(result)

        })
    })
}

function storeComment(postId, userId, date, content) {
    var sqlQuery = `insert into Comment(postId, userId, date, content) values (?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
        con.query(sqlQuery, [postId, userId, date, content], (err, results, fields) => {
            if (err) reject(err)
            resolve(200)
        })
    })
}

function getComments(postId) {
    var sqlQuery = 'select idComment, Comment.userId, username, date, content from Comment, User, post where post.postId = Comment.postId and User.idUser = Comment.userId and Comment.postId = ? order by date asc'
    return new Promise((resolve, reject) => {
        con.query(sqlQuery, [postId], (err, results, fields) => {
            if (err) reject(err)
            if (results.length > 0) {
                results = JSON.stringify(results);
                results = JSON.parse(results);
                results.forEach(result => {
                    result.date = convertDate(result.date, "hh:mm:ss A DD/MM/YYYY")
                })
                resolve(results)
            } else {
                resolve([])
            }
        })
    })
}

function end() {
    con.end()
}

module.exports = {
    connect2db,
    getPosts,
    getThePost,
    getAllTags,
    getPostsByTag,
    getNumberofTag,
    createUser,
    findUserById,
    getUser,
    storeComment,
    getComments,
    end
}
