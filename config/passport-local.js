const passport = require('passport'),
    User = require('../models/user-model'),
    bcrypt = require('bcryptjs'),
    validator = require('express-validator'),
    localStrategy = require('passport-local').Strategy;

//Tell passport how to store user in the session
passport.serializeUser(function(user,done){
    console.log('serialize'+ user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    console.log(id);
    User.findById(id, function(err, user){
         console.log('deserialize'+ user);
        done(err, user);
    });
});


//Local sign up strategy
passport.use('local.signup', new localStrategy({
    usernameField : 'email',
    password : 'password',
    passReqToCallback: true
}, function(req, email, password, done){

    //Server side validation - express validator
    req.checkBody('email','Invalid Email ').notEmpty().isEmail();
    req.checkBody('password','Invalid Password ').notEmpty();
    req.checkBody('role','Invalid Role ').notEmpty();
    req.checkBody('firstname','Invalid Firstname ').notEmpty().isAlpha();
    req.checkBody('lastname','Invalid Lastname ').notEmpty().isAlpha();
    let errors = req.validationErrors();
    if(errors) {
        let messages = [];
        errors.forEach(function(error){
            messages.push(error.msg)
        })
       return done(null, false, {message: messages}); //error from server
    }

    User.findOne({'email': email }, function(err, user){
        if(err)
            return done(err);
        if(user)    
            return done(null, false, {message: 'Email already used'});

         bcrypt.genSalt(10, (err, salt) => {
             bcrypt.hash(password, salt, (err,hash) => {
                    let newUser = new User({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: email,
                        password: hash,
                        role: req.body.role
                    });

                     newUser.save({},function(err, result) {
                      if(err) {
                             return done(err);
                        }
                        return done(null, newUser);
                    });
                  });
             })   
        });
    })
)

//Passport local strategy - login
passport.use('local.signin', new localStrategy({
    usernameField: 'email',
    password: 'password',
    passReqToCallback: true
}, function(req,email,password, done){
    
    // req,checkBody('email','Invalid Email').notEmpty().isEmail();
    // req.checkBody('password', 'Invalid Password').notEmpty();

    // let errors1 = req.validationErrors();
    // if(errors1){
    //     let messages1 = [];
    //     errors1.forEach(function(error){
    //         messages1.push(error.msg);
    //     })
    //     return done(null, false, {message: messages1});
    // }
    User.findOne({'email': email}, function(err, user, info){

        if(err)
            return done(err)
         if(!user){
             //console.log('no user');
             return done(null,false,{message: '1'}); 
         } 
         
         validPassword(password, user.password, function(err, isMatch){
   		    if(err) throw err;
            if(!isMatch){
                //console.log('wrong pwd');
               return done(null, false, {message: '2'});
            } else {
                //console.log('success');
                return done(null,user, {message: '3'});   
            }
   	      });
    })
}))

//compare password
validPassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
         if(err) throw err;
         callback(null, isMatch);
    })
}