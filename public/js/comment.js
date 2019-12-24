var commentList = document.querySelector("ul.comment-list");

async function summitComment(e) {
    var enterKey = e.keyCode;
    var ctrlKey = e.ctrlKey;
    if (enterKey === 13 && ctrlKey) {
        console.log("Bắt đầu gửi comment lên server")
        var data = await postComment()
        addComment(createNewComment(data))
    }
}

async function postComment() {
    var content = document.querySelector('#comment-input').value
    var body = {
        "date": new Date().toString(),
        "content": content
    }
    var url = window.location.href.replace('post', 'api/post')
    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if (response.status === 200) {
        return response.json();
    }
}

function addComment(comment) {
    var commentList = document.querySelector("ul.comment-list");
    commentList.appendChild(comment)
}

function createNewComment(data) {
    var username = data.username
    var date = data.date
    var content = data.content
    var comment = document.createElement("li")
    comment.classList.add("comment")
    var commentMetaData = document.createElement("div")
    commentMetaData.classList.add("comment-metadata")
    commentMetaData.appendChild(document.createElement("strong")).append(username)
    commentMetaData.append(" lúc ")
    commentMetaData.appendChild(document.createElement("span")).append(date)
    commentMetaData.lastElementChild.classList.add("comment-date")
    var commentContent = document.createElement("div")
    commentContent.classList.add("comment-content")
    commentContent.appendChild(document.createElement("p")).append(content)
    comment.appendChild(commentMetaData)
    comment.appendChild(commentContent)
    console.log(comment)
    return comment
}