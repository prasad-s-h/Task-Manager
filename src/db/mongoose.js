
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const uri = process.env.MONGODB_URI;
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

