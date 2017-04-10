const mongoose = require('mongoose'),
    schema = mongoose.Schema,
    userSchema = new schema({
        firstname : {type: String },
        lastname : { type: String },
        email : { type: String },
        password: { type: String }
    });

const User = mongoose.model('User', userSchema);
module.exports = User;    




