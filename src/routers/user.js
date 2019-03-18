
const {Users} = require('../models/users');
const {ObjectId} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const auth = require('./../middleware/auth');

const userRouter = new express.Router();

userRouter.post('/users', async (req,res) => {
    const reqKeys = Object.keys(req.body);
    const allowedCreation = ['name', 'email', 'password', 'age'];
    const allowed = reqKeys.every( (key) => allowedCreation.includes(key) );
    if(!allowed) return res.status(400).send('please include name,email,password,age  properties, however age property is optional');
    
    const body = _.pick(req.body, ['name','email','password']);
    const userDoc = new Users(body);
    try {
        const user = await userDoc.save();
        const token = await user.generateAuthToken();
        const Notification = { Meassage: `Hi ${user.name}, your Account/Profile has been successfully created` };
        res.status(201).send({Notification, user, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.get('/users/me', auth, async (req,res) => {
    try {
        const Notification = { Meassage: `Hi ${req.user.name}, Check out your Profile` };
        const userProfile = req.user;
        res.send({Notification, userProfile});
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.patch('/users/me', auth, async (req,res) => { 
    const requestKeys = Object.keys(req.body);
    const updatesAllowed = ['name', 'email', 'password'];
    const isValidOperation = requestKeys.every( (key) => updatesAllowed.includes(key) );
    if(!isValidOperation) return res.status(400).send('please include name,email,password,age properties, however age property is optional');

    const body = _.pick(req.body, ['name', 'email', 'password']);
    try {
        // const user = await Users.findOneAndUpdate({_id}, body, {new: true, runValidators:true});
        //the above statement:- findOneAndUpdate, findByIdAndUpdate bypasses the middleware, so not recommended to use, incase we require the middleware to run every time use below statement
        
        requestKeys.forEach( (key) => req.user[key] = req.body[key] );
        const newUser = await req.user.save();
        
        const Notification = { Meassage: `Hi ${req.user.name}, Your Profile has been successfully updated` };
        const userProfile = newUser;
        res.send({Notification,userProfile});
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.delete('/users/me', auth, async (req,res) => {    
    try {
        await req.user.remove();
        
        const Notification = { Meassage: `Hi ${req.user.name}, Your Account/Profile has been successfully deleted` };
        return res.send({Notification});
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.post('/users/login', async (req,res) => {
    try {
        const user = await Users.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        
        const Notification = { Meassage: `Hi ${user.name}, You have successfully logged in, check out the token for future communication`};
        res.send({Notification, token});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

userRouter.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter( (elem) => elem.token !== req.token);
        await req.user.save();
        
        const Notification = { Meassage: `Hi ${req.user.name}, You have been successfully logged out`};
        
        res.send({Notification});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

userRouter.post('/users/logoutAll' , auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        const Notification = { Meassage: `Hi ${req.user.name}, You have been successfully logged out from all the logged-in devices`};
        res.send({Notification});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

const multer = require('multer');
const upload = multer({
    dest:'pdfFiles',
    limits:{
        fileSize: 1000000
    },
    fileFilter (req, file, cb) {
        if(!file.originalname.endsWith('.pdf')) {
            return cb(new Error('Please upload a PDF'));
        }
        
        cb(undefined, true);
    }
});
userRouter.post('/users/me/pdfFiles', upload.single('pdfFiles'), (req,res) => {
    res.send();
})

module.exports = {userRouter};
