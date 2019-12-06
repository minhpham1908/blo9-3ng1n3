var moment = require("moment")

var tempD = '2019-11-08T07:13:40.000Z'
function convertDate(date, format = "DD MMM YYYY") {
    return moment(date).format(format)
}

module.exports = convertDate;