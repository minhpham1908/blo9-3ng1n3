//query
let headings = document.querySelectorAll('h2, h3, h4, h5, h6')
headings = Array.prototype.slice.call(headings);

let items = headings.map(item => `<li><${item.localName}>${item.innerText}</${item.localName}></li>`)
let tocElementContainer = document.createElement("div")
