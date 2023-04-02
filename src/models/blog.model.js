const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    tagline: {type: String},
    file:{ type: mongoose.Schema.Types.ObjectId, ref: 'files', autopopulate:{select:['name','path','type']} },
})

module.exports = mongoose.model("Blog", blogSchema);