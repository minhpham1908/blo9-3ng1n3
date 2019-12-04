const sql = require("mysql")
var moment = require("moment")
var info = {
    host: "localhost",
    user: "root",
    password: "minh1998",
    database: "blogdb"
}

var con = sql.createConnection(info)
con.connect((error) => {
    if (error) throw error
    console.log("connected")

    // get all post

    //get 1 post



    //delete a post
    //delete post in Post Table
    //delete reocord in PostTag Table by postId





    // update post information
    // update tag

    //delete a tag
    //delete record in PostTag Table by tagId




    var postInfo1 = [1, "Test 1", 'test', , "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, numquam."]
    var postInfo2 = [2, "Test 2", 'test2', , "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, numquam."]
    var postInfo3 = [3, "Tổng quan phân tích chương trình dịch", 'tong-quan-phan-tich-chuong-trinh-dich', , "Lorem sum ipsum dolor sit, amet consectetur adipisicing elit. Est, numquam."]
    // createNewPost(postInfo1)
    // createNewPost(postInfo2)
    // createNewPost(postInfo3)

    // createNewTag("complier")
    // createNewTag("template")
    // addTag(3,[7,8])



    get("tag")
    get("posttag")
    getPosts("all")
    // var tags = [6];

    // addTag(1, tags)
    // addTag(2, tags)


})
var eidtPost = (id, action = "update") => {
    var sqlQuerry = ""
    con.quer
}

var wipeoutPosts = () => {
    var sqlQuerry = "DELETE FROM Post"
    con.query(sqlQuerry, (err, result) => {
        console.log("done");
    })
    sqlQuerry = "DELETE FROM PostTag"
    con.query(sqlQuerry, (err, result) => {
        console.log("done");
    })
};

var getPosts = (option) => {
    if (option === "all") {
        var sqlQuerry = "select * from Post, posttag where post.postId = posttag.postId"
        con.query(sqlQuerry, (err, results) => {
            console.log("Post: ");
            var string = JSON.stringify(results);
            console.log(string + "\n")
        })
        var sqlQuerry = "select * from PostTag"
        con.query(sqlQuerry, (err, results) => {
            console.log("Post Tag: ");
            var string = JSON.stringify(results);
            console.log(string + "\n")
        })
    }
}

var getTags = () => {
    var sqlQuerry = "select * from tag"
    con.query(sqlQuerry, (err, results) => {
        console.log("Tag: ");
        var string = JSON.stringify(results);
        console.log(string + "\n")
    })
}
var get = (table, option) => {
    var sqlQuerry = `select * from ${table}`
    con.query(sqlQuerry, (err, results) => {
        console.log(`${table}: `);
        var string = JSON.stringify(results);
        console.log(string + "\n")
    })
}


//create a post
//create a new reocord in PostTag Table by postId
//luu bai viet duoi dang markdown
var createNewPost = (postInfo) => {
    postInfo[3] = moment().format("YYYY-MM-DD HH:mm:ss")
    var sqlQueryTemplate = "INSERT INTO Post (postId, title, path, dateCreated, summary) VALUES (?, ?, ?, ? ,?)"
    var sqlQuery = sql.format(sqlQueryTemplate, postInfo)
    console.log(sqlQuery)
    con.query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log("1 record inserted");
    })

}



const addTag = (postId, tags) => {
    tags.forEach(tag => {
        var sqlQuery = `INSERT INTO posttag (tagId, postId) VALUES ('${tag}', '${postId}')`
        con.query(sqlQuery, (err, results) => {
            if (err) throw err;
            console.log("1 record inserted");
        })
    });
}

//create a new tag
const createNewTag = (tag) => {
    var sqlQuery = `INSERT INTO tag (tag) VALUES ('${tag}')`
    con.query(sqlQuery, (err, results) => {
        if (err) throw err;
    })
}
con.end(function (err) {
    if (err) {
        return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
})

function connect2db() {
    return new Promise((resolve, reject) => {
        con.connect((error) => {
            if (error) reject(error)
            resolve("Connected!")
        })
    })
}

function getPosts() {

    var sqlQuery = "select * from post"
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

function getTags() {
    var sqlQuery = "select * from Tag"
    con.query(sqlQuery, function(err, results, fields){
        if (err) reject(err)
        results = JSON.stringify(results);
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


