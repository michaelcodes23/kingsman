const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const session = require('express-session');
const bcrypt = require('bcrypt');
const salt_rounds = 10;

//Sessions - new route
router.get('/new', (req,res)=>{
    res.render('./sessions/new.ejs')
})
// Sessions - Post
router.post('/', (req, res)=>{
    console.log(req.body);
    User.findOne({"username": req.body.username}, (error, foundUser)=>{
        console.log(foundUser)
        console.log(foundUser.messages)
        req.session.currentUser = foundUser
        if(foundUser.password === null){
            res.redirect('/new')
        } else {
            console.log(req.body.password, foundUser.password)
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
            if (doesPasswordMatch){
                console.log(req.session, 'You logged in successfully')
                req.session.userId = foundUser._id;
                console.log(req.session)
                res.redirect('/room')
            } else {
                res.send('Incorrect Login Info, Try Again!')
            }
        }
    });

})

//Destroy Session
router.get('/logout', (req,res)=>{
    req.session.destroy( (err)=>{
        if(err){
            console.log('Could not logout properly or user was not logged in')
            res.redirect('/')
        } else {
            console.log('Log out was successful')
            res.redirect('/')
        }
    });
})

module.exports = router;