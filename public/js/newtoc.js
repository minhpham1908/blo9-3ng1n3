
// work for this structure: ## [](#phan-1-chuong-2) Phân tích cú pháp (Syntax Analysis)

function getLink(header) {
    // tao 1 anchor tag
    let anchor = document.createElement("a")
    anchor.href = "#" + header.id;
    anchor.textContent = header.textContent;
    header.textContent = ""
    header.insertBefore(anchor, null)
    header.removeAttribute("id");
    return header;
}
// function generateTOC() {
//initialization level2, 3 ,4
let l2 = 0, l3 = 0, l4 = 0;
//query 
let headings = document.querySelectorAll('h2, h3, h4, h5, h6');
let tocContainer = document.querySelector(".toc-container");

let Ul = document.createElement("ul");
//add a ul to toc-container
tocContainer.appendChild(Ul.cloneNode(true));
//add header to toc-container
headings.forEach(h => {
    let header = h.cloneNode(true);
    if (header.tagName === "H2") {
        l2++ , l3 = 0, l4 = 0;
        tocContainer.lastElementChild.appendChild(document.createElement("li")).appendChild(getLink(header));
    } else if (header.tagName === "H3") {
        l3++ , l4 = 0;
        //If this is frist h3 in the current h2
        if (l3 === 1) tocContainer.lastElementChild.append(Ul.cloneNode(true));
        // get toc.ul.ul
        tocContainer.lastElementChild.lastElementChild.appendChild(document.createElement("li")).appendChild(getLink(header));

    } else if (header.tagName === "H4") {
        l4++;
        //If this is frist h4 in the current h3
        if (l4 === 1) tocContainer.lastElementChild.lastElementChild.append(Ul.cloneNode(true));
        // get toc.ul.ul.ul
        tocContainer.lastElementChild.lastElementChild.lastElementChild.appendChild(document.createElement("li")).appendChild(getLink(header));
    }

})

// }
// generateTOC()