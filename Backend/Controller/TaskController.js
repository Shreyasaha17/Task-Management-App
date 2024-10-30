const Task = require('../Model/TaskSchema');
const User = require('../Model/UserSchema');

class TaskController {
    static addTask = async (req, res) => {
        let newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status, 
            dueDate: req.body.dueDate,
            user: req.user_id,
        });

        try {
            newTask = await newTask.save();
            await User.updateOne(
                { _id: req.user_id },
                { $push: { tasks: newTask._id } }
            );
            res.status(201).json({ message: "Task successfully added!", task: newTask });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };


    
    static getAllTasks = async (req, res) => {
        try {
            const allTasks = await Task.find({ user: req.user_id }); 
            res.status(200).json(allTasks);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };


    static updateTask = async (req, res) => {
        const id = req.params.id; 
        const { title, description, status, dueDate } = req.body; 
    
        const updatedTask = await Task.findByIdAndUpdate(id,{ title, description, status, dueDate });
    
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
            res.status(200).json({message: "Task successfully updated!"});
    };


    
    static deleteTask = async (req, res) => {
        const id = req.params.id;
        const deleteTask = await Task.findById(id);

        if (!deleteTask) {
            return res.status(404).json({ message: "Task not found!" });
        }

        try {
            await Task.findByIdAndDelete(id);
            await User.updateOne(
                { _id: deleteTask.user },
                { $pull: { tasks: deleteTask._id } } 
            );
            res.status(200).json({ message: "Task successfully deleted!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
}

module.exports = TaskController;
