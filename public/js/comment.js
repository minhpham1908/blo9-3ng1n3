
function summitComment(e) {
    var enterKey = e.keyCode;
    var ctrlKey = e.ctrlKey;
    if (enterKey === 13 && ctrlKey) {
        console.log("Bắt đầu gửi comment lên server")
        postComment()
    }
}

function postComment() {
    var url = "/api/post/"
    fetch()
}
