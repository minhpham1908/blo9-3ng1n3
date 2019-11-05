var fs = require('fs');
var dataaa = 2
console.log(dataaa)

fs.readFile(__dirname + "/posts/test.md", (error, data) => {
    if (error) throw error

})

