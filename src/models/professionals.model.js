const mongoose = require("mongoose");
const professionalsSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    position: {type: String},
    file:{ type: mongoose.Schema.Types.ObjectId, ref: 'files', autopopulate:{select:['name','path','type']} },  
})

module.exports = mongoose.model("Professionals", professionalsSchema);