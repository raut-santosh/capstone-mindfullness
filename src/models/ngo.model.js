const mongoose = require("mongoose");
const ngoSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    items: [{}]
})

module.exports = mongoose.model("Ngo", ngoSchema);