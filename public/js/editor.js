
var simplemde = new SimpleMDE({
    autofocus: true,
    
    element: document.getElementById("content"),
    
    insertTexts: {
        horizontalRule: ["", "\n\n-----\n\n"],
        image: ["![](http://", ")"],
        link: ["[", "](http://)"],
        table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
    },
    lineWrapping: true,
    previewRender: function (plainText, preview) { // Async method
        setTimeout(function () {
            preview.innerHTML = simplemde.markdown(plainText);
        }, 250);

        return "Loading...";
    },
    promptURLs: false,
    renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
    },
    shortcuts: {
        drawTable: "Cmd-Alt-T"
    },
    showIcons: ["code", "table"],
    spellChecker: false,
    status: ["autosave", "lines", "words", "cursor", {
        className: "keystrokes",
        defaultValue: function (el) {
            this.keystrokes = 0;
            el.innerHTML = "0 Keystrokes";
        },
        onUpdate: function (el) {
            el.innerHTML = ++this.keystrokes + " Keystrokes";
        }
    }], // Another optional usage, with a custom status bar item that counts keystrokes
    styleSelectedText: false,
    tabSize: 4,
    toolbar: false

});

var content
var getContentBtn = document.querySelector("#get-content")
getContentBtn.addEventListener("click", getContent)

function getContent() {
    content = simplemde.value()
}