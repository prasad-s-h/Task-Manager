
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
const TaskSchema = new Schema({
    description: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
},{
    timestamps: true
});

const Tasks = mongoose.model('Tasks', TaskSchema);

module.exports = {
    Tasks
};

