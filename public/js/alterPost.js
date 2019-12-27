var updateBtn = document.querySelector("#update-content")
var deleteBtn = document.querySelector("#delete-content")


updateBtn.addEventListener("click", updateF)
deleteBtn.addEventListener("click", deleteF)

async function updateF() {
    var url = window.location.href.replace('post', 'api/post')
    var response = await fetch(url, {
        method: 'UPDATE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
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