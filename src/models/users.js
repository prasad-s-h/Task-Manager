
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {Tasks} = require('./../models/tasks');

let Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    age: {
        type: Number,
        default: 23
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 1,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('please enter a valid email id');
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('please enter a valid password');
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }],
    avatar:{
        type: Buffer
    }
},{
    timestamps: true
});

UserSchema.virtual('UserTasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
});

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await Users.findOne({email});
    if(!user) {
        throw new Error('Unable to login');
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = bcrypt.compareSync(password, user.password);
    if(!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'secretKey');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};

//pre hook:- hash the password before saving
UserSchema.pre('save', function(next){
    let userDoc = this;
    if(userDoc.isModified('password')){
        bcrypt.genSalt(11).then( (salt) => {
            return bcrypt.hash(userDoc.password, salt);
        }).then( (hash) => {
            userDoc.password = hash;
            next();    
        }).catch( (err) => {
            console.log('err = ', err);
        });
    }else{
        next();
    }
});

//pre hook:- delete all the user-related tasks
UserSchema.pre('remove', async function(next){
    let userDoc = this;
    await Tasks.deleteMany({owner: userDoc._id});
    next();
});

const Users = mongoose.model('Users', UserSchema);

module.exports = {
    Users
};

