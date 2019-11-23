var marked = require("marked")
var fs = require("fs")

const renderer = new marked.Renderer()


//overriding
renderer.link = (href) => {
    var id = href.substring(1)
    return `<a href="${href}" id="${id}"></a>`
}

marked.setOptions({
    renderer: renderer
})


console.log(marked("## [a](#phan-1)Phân tích chương trình nguồn"))