const express = require('express'),
     path = require('path'), 
     bodyParser = require('body-parser'),
     validator = require('express-validator'),
     cookieParser = require('cookie-parser'),
     cors = require('cors'),
     mongoose = require('mongoose'),
     session = require('express-session'),
     passport = require('passport'),
     mongoStore= require('connect-mongo')(session),
     config = require('./config/database'),
     userroutes = require('./routes/user-routes'),
     PORT = 3000; //PORT
     
    //mongoose connectio and connection check 
     mongoose.connect(config.database);
     mongoose.connection.on('connected',()=>{
         console.log('connected to' + config.database );
     });
     mongoose.connection.on('error', ()=>{
         console.log('not connected to' +config.database);
     });
     
    //Middlewares 
     const app = express();
     app.use(bodyParser.json());
     app.use(validator());  //important - after body parser
     app.use(cookieParser());

     app.use(cors());
     require('./config/passport')(passport), //important (passport)
     app.use(session({
         secret : 'mysupersecret',
         resave: false,
         saveUninitialized: false
     }));
     app.use(passport.initialize());
     app.use(passport.session());

     //Routes
     app.use('/users', userroutes);

     //statics
     app.use(express.static(path.join(__dirname+'/client')));
  
     
     app.get('/',(req,res)=>{
         res.send('invalid endpoint');
     });

     app.get('*', (req,res) => {
         res.sendFile(path.join(__dirname, 'client/index.html'));
     })

     //listen
    app.listen(PORT,(req, res)=>{
        console.log('listening');
    })