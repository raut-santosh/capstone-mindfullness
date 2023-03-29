const mongoose = require("mongoose");
const professionalsSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    items: [{}]

})