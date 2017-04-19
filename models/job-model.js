var mongoose = require('mongoose'),
    schema =   mongoose.Schema;
    jobSchema = new schema ({
        title: { type: String},
        description: { type: String },
        address : {
            city: { type: String },
            state: { type: String },
            country: { type: String },
            createdOn: { type: Date , default : Date.now}
        },
        userid: {type: schema.Types.ObjectId, ref: 'User'},
    })

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;

