var moment = require("moment")


function convertDate(date, format = "DD MMM YYYY") {
    return moment(date).format(format)
}

module.exports = convertDate;