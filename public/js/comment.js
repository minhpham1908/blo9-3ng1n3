
async function summitComment(e) {
    var enterKey = e.keyCode;
    var ctrlKey = e.ctrlKey;
    if (enterKey === 13 && ctrlKey) {
        console.log("Bắt đầu gửi comment lên server")
        try {
            var data = await postComment()
        } catch (error) {
            console.log(error)
        }

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
    if(response.status === 200 ) {
        addComment()
    }
    return response;

}

function addComment()
