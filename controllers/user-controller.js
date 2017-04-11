const User = require ('../models/user-model'),
      Profile = require('../models/profile-model'),  
    jwt = require('jsonwebtoken'),
    config = require('../config/database'),
    bcrypt = require('bcryptjs');

module.exports.getUserByEmail = (email, callback) => {
    const query = {email: email};
    User.findOne(query, callback);
};

module.exports.register = (req, res, next) => {
    let newUser = new User ({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password : req.body.password
    });

   this.addUser(newUser,(err, user, info)=>{
       if(err && info=='1'){
           return res.json({success: false, message: 'failed to register'});
       } else if(err && info=='2') {
           return res.json({success: false, message: 'Email already exists'});
       } else {
          return res.json({success: true,  message: 'Successfully registerd'});
       }
   })
}

//Add User
module.exports.addUser = (newUser, callback) => {
    this.getUserByEmail(newUser.email, (err,user) => {
        if(err) {
            callback(true,'','1');
            return false;
        }
        if(user) {
            callback(true,user,'2');
            return false;
        } else {
                  bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save(callback);
                  });
             });
        }
    })
}


//Authenticate
module.exports.login = (req, res, next) => {
   const email = req.body.email,
         password = req.body.password;

    this.getUserByEmail(email,(err,user) => {
        if(err) throw err;

        if(!user) {
            return res.json({success: false, message: 'User not found'});
        }

        this.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn : 604800
                });

                res.json({
                    success: true,
                    message: 'You are logged in',
                    token : 'JWT '+token,
                    user : {
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    }
                })
            } else {
                res.json({success: false, message: 'Wrong Password'});
            }
        });
    });
}

//Compare Password
module.exports.comparePassword = function(candidatePassword, hash, callback) {
     bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    })
}

//Profile
module.exports.profile = (req,res,next) => {
    return res.json(req.user);
}
//Profile data 
module.exports.getProfileData = (req, res, next) => {
    Profile.findOne({userid: req.query.id},(err,results) => {
        if(err) {
            console.log(err);
        } else {
            return res.json(results);
        }
    })

}

//Create profile
module.exports.createprofile = (req, res, next) => {
    let newProfile = new Profile(req.body);
    newProfile.save({},(err, results)=>{
        if(err) {
            return res.json({success: false, message: 'Profile not created'});
        } else {
        return res.json({success: true, message: 'Profile created successfully'});
        }
    })
    
}
