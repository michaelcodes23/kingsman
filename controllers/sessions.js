const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const session = require('express-session');

//Sessions - new route
router.get('/new', (req,res)=>{
    res.render('./sessions/new.ejs')
})
// Sessions - Post
router.post('/', (req, res)=>{
    console.log(req.body);
    User.findOne({"username": req.body.username}, (error, foundUser)=>{
        console.log(foundUser)

        if(foundUser[0].password === null){
            res.redirect('/new')
        } else if (req.body.password === foundUser[0].password){
            console.log(req.session)
            res.redirect('/room')
        } else {
            res.send('Incorrect Login Info, Try Again!')
        }
    });

})

//Destroy Session
router.get('/logout', (req,res)=>{
    req.session.destroy();
    res.redirect('/')
})

module.exports = router;