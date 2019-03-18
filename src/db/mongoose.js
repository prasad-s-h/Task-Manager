
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const uri = 'mongodb://localhost:27017/task-manager-api';
const options = {
    useNewUrlParser: true, 
    useCreateIndex: true
}
mongoose.connect(uri, options).then( () => {
    console.log('established connection to the db');
}).catch( (err) => {
    console.log('err while establishing connection to the db');
    console.log(err);
});

