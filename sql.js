const sql = require("mysql")
var moment = require("moment")
var info = {
    host: "14.248.16.234",
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



    //create a new tag

    // update post information
    // update tag

    //delete a tag
    //delete record in PostTag Table by tagId


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

    var postInfo1 = [1, "Test 1", 'test', , "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, numquam."]
    var postInfo2 = [2, "Test 2", 'test2', , "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, numquam."]
    // createNewPost(postInfo1)
    // createNewPost(postInfo2)



    get("tag")
    get("posttag")
    getPosts("all")
    var tags = [6];

    // addTag(1, tags)
    // addTag(2, tags)

    con.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    })
})
