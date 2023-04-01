const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    name: {type: String},
    filename: {type: String},
    type: {type: String},
    path: {type: String}
}, {timestamp: true})

module.exports = mongoose.model('File',fileSchema)