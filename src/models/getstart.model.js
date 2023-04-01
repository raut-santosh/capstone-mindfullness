const mongoose = require("mongoose");
const getStartSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    items: [{}]
})

module.exports = mongoose.model('GetAStart', getStartSchema)