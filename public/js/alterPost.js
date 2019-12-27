var updateBtn = document.querySelector("#update-content")
var deleteBtn = document.querySelector("#delete-content")
var title = document.querySelector("#title-input")
title.readOnly = true;
tagInput.readOnly = true;

updateBtn.addEventListener("click", updateF)
deleteBtn.addEventListener("click", deleteF)



async function updateF() {
    var url = window.location.href.replace('post', 'api/post')
    var body = {}
    body.content = getContent()
    var response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if (response.status === 200) {
        location.replace("http://localhost:3201")
    }
}

async function deleteF() {
    var url = window.location.href.replace('post', 'api/post')
    console.log(url)
    var response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.status === 200) {
        location.replace("http://localhost:3201")
    }
}