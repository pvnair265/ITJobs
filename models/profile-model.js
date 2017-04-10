const mongoose = require('mongoose'),
      schema= mongoose.Schema
      profileSchema = new schema ({
          userid: {type: schema.Types.ObjectId, ref: 'User'},
          address: {
              city: String,
              country: String,
              state: String
          },
          emptype: String,
          hourly: String,
          relocate: String,
          salary: String,
          title: String,
          yearsofexp: String,
          generalinfo: {
              facebook: String,
              linkedin: String,
              twitter: String,
              phone: String
          },
          workexperience: [],
          topskills:[]
      });

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
