
const {Tasks} = require('../models/tasks');
const {ObjectId} = require('mongodb');
const _ = require('lodash');
const auth = require('./../middleware/auth');
const express = require('express');

const taskRouter = new express.Router();

taskRouter.post('/tasks', auth, async (req,res) => {
    const reqKeys = Object.keys(req.body);
    const allowedCreation = ['description', 'completed'];
    const allowed = reqKeys.every( (key) => allowedCreation.includes(key));
    if(!allowed) return res.status(400).send('please include description and completed properties, however completed property is optional');

    const taskDoc = new Tasks({
        ...req.body,
        owner:req.user._id
    });
    try {
        const task = await taskDoc.save();
        const Message = { Notification: `Hi ${req.user.name}, Task has been successfully created`};
        res.status(201).send({Message, task});
    } catch (error) {
        res.status(400).send(error);
    }
});

taskRouter.get('/tasks/me', auth, async (req,res) => {
    try {
        let { completed, limit, skip, sortBy } = req.query;
        limit = parseInt(limit);
        skip = parseInt(skip);
        const match = {};
        const sort = {};
        if(completed) {
            // the below statement sets completed as Boolean type rather than String type
            match.completed = completed === 'true';
        }
        if(sortBy){
            const [field, order] = sortBy.split(':');
            sort[field] = order === 'desc' ? -1 : 1;
        }

        // first way to get the list of user-related documents 
        // const tasks = await Tasks.find({owner: req.user._id});
        
        // second way to get the list of user-related documents 
        await req.user.populate({
            path: 'UserTasks',
            match,
            options: {
                limit,
                skip,
                sort
            }
        }).execPopulate();

        await Tasks.find({owner: req.user._id}).pop

        const Message = { Notification: `Hi ${req.user.name}, here is the List of Tasks created by you`};
        res.send({Message, UserTasks: req.user.UserTasks});
    } catch (error) {
        res.status(400).send(error);
    }
});

taskRouter.get('/tasks/me/:id', auth, async (req,res) => {
    const taskId = req.params.id;
    if(!ObjectId.isValid(taskId)) {
        return res.status(400).send();
    }
    try {
        const tasks = await Tasks.findOne({
            _id: taskId,
            owner: req.user._id
        });
        if(!tasks) return res.status(404).send();
        const Message = { Notification: `Hi ${req.user.name}, check out the details of the task with the specified id: ${taskId}`};
        return res.send({Message, tasks});
    } catch (error) {
        res.status(400).send(error);
    }
});

taskRouter.patch('/tasks/me/:id', auth, async (req,res) => {
    const taskId = req.params.id;
    if(!ObjectId.isValid(taskId)) return res.status(400).send('invalid id passed');
    
    const reqKeys = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = reqKeys.every( (key) => allowedUpdates.includes(key) );
    if(!isValidOperation) return res.status(400).send('please include description and completed properties, however completed property is optional');
    
    try {
        // const task = await Tasks.findOneAndUpdate({_id}, body, {new: true});
        const task = await Tasks.findOne({
            _id: taskId, 
            owner:req.user._id
        });
        if(!task) return res.status(404).send('task not found with the specified id');

        reqKeys.forEach( (key) => task[key] = req.body[key] );
        const updatedTask = await task.save();
        
        const Message = { Notification: `Hi ${req.user.name}, Task with the following id: ${taskId} has been successfully updated`};
        res.send({Message, updatedTask});
    } catch (error) {
        res.status(400).send(error);
    }
});

taskRouter.delete('/tasks/me/:id', auth, async (req,res) => {
    const taskId = req.params.id;
    if(!ObjectId.isValid(taskId)) {
        return res.status(400).send();
    }
    try {
        const task = await Tasks.findOneAndDelete({
            _id: taskId,
            owner: req.user._id
        });
        if(!task) return res.status(404).send(); 
        
        const Message = { Notification: `Hi ${req.user.name}, Task with the following id: ${taskId} has been successfully deleted`};
        return res.send({Message, task});
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = {taskRouter};
