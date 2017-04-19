const mongoose = require('mongoose'),
    schema = mongoose.Schema,
    userSchema = new schema({
        firstname : {type: String },
        lastname : { type: String },
        email : { type: String },
        password: { type: String },
        role : { type: Number },
        status: { type: String, default: 'A'}
    });

const User = mongoose.model('User', userSchema);
module.exports = User;    




