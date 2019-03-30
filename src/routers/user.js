
const {Users} = require('../models/users');
const {ObjectId} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const auth = require('./../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const {welcomeEmail, deleteEmail, mailToken} = require('./../email/account');

const userRouter = new express.Router();
const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter (req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a jpg/jpeg/png files'));
        }
        
        cb(undefined, true);
    }
});

userRouter.post('/api/users', async (req,res) => {
    const reqKeys = Object.keys(req.body);
    const allowedCreation = ['name', 'email', 'password', 'age'];
    const allowed = reqKeys.every( (key) => allowedCreation.includes(key) );
    if(!allowed) return res.status(400).send('please include name,email,password,age  properties, however age property is optional');
    
    const body = _.pick(req.body, ['name','email','password']);
    const userDoc = new Users(body);
    try {
        const user = await userDoc.save();
        const token = await user.generateAuthToken();
        welcomeEmail(user.name, user.email);
        const Notification = { Meassage: `Hi ${user.name}, your Account/Profile has been successfully created` };
        res.status(201).send({Notification, user, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.get('/api/users/me', auth, async (req,res) => {
    try {
        const Notification = { Meassage: `Hi ${req.user.name}, Check out your Profile` };
        const userProfile = req.user;
        res.send({Notification, userProfile});
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.patch('/api/users/me', auth, async (req,res) => { 
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

userRouter.delete('/api/users/me', auth, async (req,res) => {    
    try {
        await req.user.remove();
        deleteEmail(req.user.name, req.user.email);
        const Notification = { Meassage: `Hi ${req.user.name}, Your Account/Profile has been successfully deleted` };
        return res.send({Notification});
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.post('/api/users/login', async (req,res) => {
    try {
        const user = await Users.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        const Notification = { Meassage: `Hi ${user.name}, You have successfully logged in, check out the token for future communication`};
        res.send({Notification, token});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

userRouter.post('/api/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter( (elem) => elem.token !== req.token);
        await req.user.save();
        
        const Notification = { Meassage: `Hi ${req.user.name}, You have been successfully logged out`};
        
        res.send({Notification});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

userRouter.post('/api/users/logoutAll' , auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        const Notification = { Meassage: `Hi ${req.user.name}, You have been successfully logged out from all the logged-in devices`};
        res.send({Notification});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

userRouter.post('/api/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    const Notification = { Meassage: `Hi ${req.user.name}, Your avatar has been successfully uploaded`};
    res.send(Notification);
}, (error, req, res, next) => {
    if(error) res.status(400).send({Error: error.message});
});

userRouter.delete('/api/users/me/avatar', auth, async (req,res) => {
    // req.user.avatar = Buffer.alloc(0);
    req.user.avatar = undefined;
    await req.user.save();
    const Notification = { Meassage: `Hi ${req.user.name}, Your avatar has been successfully removed`};
    res.send(Notification);
});

userRouter.get('/api/users/me/avatar/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        if(!ObjectId.isValid(userId)) throw new Error();
        
        const user = await Users.findById(userId);
        if(!user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
});

userRouter.post('/api/users/me/resetPassword', async (req, res) => {
    try {
        const obtainedKeys = Object.keys(req.body);
        const allowedKeys = ["email"];
        const result = obtainedKeys.every( (key) => allowedKeys.includes(key) );
        if(!result) return res.status(400).send('please include only email property');

        const user = await Users.findOne({email: req.body.email});
        if(!user) return res.status(404).send('User not found with the assosciated Email');
        
        const token = await user.generateAuthToken();
        mailToken(user.name, user.email, token);
        const Notification = { Message: `Hi ${user.name}, Token has been mailed to your email account provided by you. Please Use that Token to reset the password`}
        res.send(Notification);
    } catch (error) {
        res.status(400).send();
    }
});

module.exports = {
    userRouter
};

