const mongoose = require("mongoose");

const addTask = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    dueDate: {
        type: Date,
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Task = mongoose.model("Task", addTask);
module.exports = Task;
