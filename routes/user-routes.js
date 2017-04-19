const express = require('express'),
      User = require('../models/user-model'),
      Profile = require('../models/profile-model'),
      passport = require('passport'),
      jwt = require('jsonwebtoken'),
      userController = require('../controllers/user-controller'),  
      router = express.Router();

router.post('/register', userController.register); //Register User
router.post('/login', userController.login); //Login User

router.get('/profile', passport.authenticate('jwt',{session:false}), userController.profile); //Login User
router.post('/createprofile', passport.authenticate('jwt',{session:false}), userController.createprofile); 
router.post('/postjobs', passport.authenticate('jwt',{session: false}), userController.postjobs);
router.get('/getprofiledata', userController.getProfileData);
module.exports = router;  