let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
let passport = require('passport');

let User = require('../models/user');

//Register Form
router.get('/register', function(req, res){
    res.render('register');
});

//register process
router.post('/register', function(req, res){
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();
    if (errors){
        res.render('register', {
            errors: errors
        });
    } else{
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(error, hash){
                if (error){
                    console.log(error);
                }
                newUser.password = hash; //hash password
                newUser.save(function(error){
                    if(error){
                        console.log(error);
                        return
                    } else{
                        req.flash('success', 'You are now registered and can log in to bored@thebutt');
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
});

router.get('/login', function(req, res){
    res.render('login');
});

//login process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/posts',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out')
    res.redirect('/')
});
module.exports = router;