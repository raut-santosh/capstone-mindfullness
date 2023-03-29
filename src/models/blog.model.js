const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    header_image: {
        type: String
    }
})

module.exports = mongoose.model("Blog", blogSchema);