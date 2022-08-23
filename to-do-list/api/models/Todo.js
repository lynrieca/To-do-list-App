const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {
        type: String,
        requried: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamp:{
        type: String,
        default: Date.now()
    }
})

//now this is where we actually create the model and give it a schema
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;

