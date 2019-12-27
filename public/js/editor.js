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

const config = {
    placeholderValue: 'Nhập vào tag cho bài viết',
    shouldSort: false,
    searchEnabled: true,
    searchFloor: 2,
    searchChoices: true,
    duplicateItems: false,
    delimiter: ',',
    addItems: true,
    removeItemButton: true,
}
const tagInput = document.getElementById('tags-input')
const choices = new Choices(tagInput, config);

var apiUrl = new URL("http://localhost:3201/api/tags");
var lookupDelay = 100;
var lookupTimeout = null;
var lookupCache = {};

var serverLookup = function () {
    var query = choices.input.value;
    if (query in lookupCache) {
        populateOptions(lookupCache[query]);
    } else {
        console.log("asdaasd")
        var params = { query: query }
        apiUrl.search = new URLSearchParams(params).toString()

        var response = fetch(apiUrl)
        // ajax.post(apiUrl, { query: query }, function (event) {
        //     var results = event.target.getResponseJson();
        //     lookupCache[query] = results;
        //     populateOptions(results);
        // })
    }
};

// Function to actually populate the results from the API lookup.
var populateOptions = function (options) {
    // We have to cull duplicates ourselves here, because Choices doesn't do it for
    // us. There's probably a better way of doing this, but here's the easy way:
    var toRemove = [];
    for (var i = 0; i < choices.currentState.items.length; i++) {
        var item = choices.currentState.items[i];
        if (item.active) {
            toRemove.push(item.value);
        }
    }
    var toKeep = [];
    for (var i = 0; i < options.length; i++) {
        // However you check if an array contains something in your codebase.
        if (!array_contains(toRemove, result.id)) {
            toKeep.push(result);
        }
    }
    // Now actually set the (de-duped) results.
    choices.setChoices(toKeep, 'id', 'text', true);
};

// Trigger an API lookup when the user pauses after typing.
tagInput.addEventListener('search', function (event) {
    console.log("search")
    clearTimeout(lookupTimeout);
    lookupTimeout = setTimeout(serverLookup, lookupDelay);
});

// We want to clear the API-provided options when a choice is selected.
tagInput.addEventListener('choice', function (event) {
    console.log("choice")
    choices.setChoices([], 'id', 'text', true);
});

