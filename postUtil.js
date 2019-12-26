var fs = require('fs')
var sqlUtil = require('./sql')
async function postToMetadata(body) {
    var path = format(body.title)
    var date = new Date(body.date)
    var tags = body.tags
    post = {
        title: body.title,
        path: path,
        date: date,
        summary: "Lorem sum ipsum dolor sit, amet consectetur adipisicing elit. Est, numquam",
        tags: tags
    }
    console.log(post)
    await sqlUtil.createPost(post)
    var post = await sqlUtil.getThePost(path)
    //add tag to tag table and posttag
    tags.forEach(async (tag) => {
        console.log(tag)
        var tagInfo = await sqlUtil.getTagId(tag)
        if (tagInfo.length === 0) {
            await sqlUtil.createTag(tag)
        }
        tagInfo = await sqlUtil.getTagId(tag)
        await sqlUtil.createPostTag(tagInfo[0].tagId, post.postId)
    });

}

function postToFileContent(body) {
    var path = __dirname + "/posts/" + format(body.title) + ".md"
    content = body.content
    console.log(path)
    console.log(content)
    fs.writeFileSync(path, content)

}

function format(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/ /g, "-");
    str = str.toLowerCase();
    return str;
}

module.exports = {
    postToMetadata,
    postToFileContent
}