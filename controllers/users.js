//route for new user/create new user

const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const salt_rounds = 10;
//create new user
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

router.post('/', (req, res) => {
    console.log(req.body)
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(salt_rounds))
    User.create(req.body, (error, createdUser) => {
        res.redirect('/')
    })
})

module.exports = router;