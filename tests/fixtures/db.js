
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {Users} = require('../../src/models/users');
const {Tasks} = require('../../src/models/tasks');

const userOneId = mongoose.Types.ObjectId();
const userTwoId = mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "prasad's test1",
    email: "prasad_s_h@hotmail.com",
    password: "123456789",
    tokens:[{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET_KEY) 
    }]
};
const userTwo = {
    _id: userTwoId,
    name: "prasad's test2",
    email: "laxmisa58@gmail.com",
    password: "123456789",
    tokens:[{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET_KEY) 
    }]
};

const taskOne = {
    _id: mongoose.Types.ObjectId(),
    description: 'task 1',
    completed: false,
    owner: userOneId
};
const taskTwo = {
    _id: mongoose.Types.ObjectId(),
    description: 'task 2',
    completed: true,
    owner: userOneId
};
const taskThree = {
    _id: mongoose.Types.ObjectId(),
    description: 'task 3',
    completed: true,
    owner: userTwoId
};

const setUpDatabase = async () => {
    await Users.deleteMany();
    await Tasks.deleteMany();
    await new Users(userOne).save();
    await new Users(userTwo).save();
    await new Tasks(taskOne).save();
    await new Tasks(taskTwo).save();
    await new Tasks(taskThree).save();
};

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase
};

