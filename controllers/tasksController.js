const express = require('express')
const Task = require('../models/Task');
const asyncHandler = require('express-async-handler');
const { taskSchema } = require('../helpers/validateData');
const User = require('../models/User')

//Create Task
const createTask = asyncHandler(async (req, res) => {
    const { task_result } = await taskSchema.validateAsync(req.body);

    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        user: req.user._id,
        name: req.user.name
    });

    await task.save();

    res.status(200).json({ data: task_result, message: "Task created successfully!" });

    const user = await User.findOne({
        _id: req.user._id,
    });
    user.tasks.push(task._id);
    await user.save();
});

//Get tasks
const getTasks = asyncHandler(async (req, res) => {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const tasks = await Task.find({ user: req.user._id }).limit(limit).sort({ createdAt: -1 }).skip(skip);

    const totalTasksForUser = await Task.countDocuments({ user: req.user._id });
    const totalTasks = await Task.countDocuments();

    if (tasks.length === 0) {
        return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json({
        data: tasks,
        skip: skip,
        page: page,
        limit: limit,
        totalTasksForUser: totalTasksForUser,
        totalTasks: totalTasks,
        message: "All tasks found!"
    });
});

//Get Task ID
const getTaskById = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findOne({ _id: taskId, user: req.user._id }).populate('user', 'name email');
    
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ data: task, message: "Task found for the specified ID" });
});

//Update Task
const updateTask = asyncHandler(async (req, res) => {
    const task_result = await taskSchema.validateAsync(req.body);

    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id) {
        return res.status(403).json({ message: "User doesn't have permission to update other user tasks" });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, task_result, { new: true });

    if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ data: updatedTask, message: "Task updated successfully!" });
});

//Delete Task
const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });

    if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully!" });
});


module.exports = {
    createTask,getTasks,getTaskById,updateTask,deleteTask
};

