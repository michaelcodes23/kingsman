//route for new user/create new user

const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

//create new user
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

router.post('/', (req, res) => {
    User.create(req.body, (error, createdUser) => {
        res.redirect('/')
    })
})

module.exports = router;