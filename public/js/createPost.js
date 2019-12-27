var post = {
    title: '',
    content: '',
    date: '',
    tags: [],

}
var getContentBtn = document.querySelector("#get-content")
getContentBtn.addEventListener("click", postPost)

async function postPost() {
    post.title = document.querySelector("#title-input").value
    post.date = new Date();
    post.content = getContent()
    post.tags = choices.getValue(true)
    console.log(post)
    var url = new URL("http://localhost:3201/newpost")
    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }
    )
    if (response.status === 200) {
        location.replace("http://localhost:3201")
    }
}

