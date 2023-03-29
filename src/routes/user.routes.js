const express = require("express");
const router = express.Router();
const User = require('../models/user.model')

router.get('/register', (req, res,next) => {
    console.log(req.body)
    res.render('register', {
        title: 'About Me',
        name: 'santosh raut',
        age: 21
    })
})

router.post('/register', (req, res) => {
    User.find({ email: req.body.email }).then((user) => {
        if (user.length >= 1) {
          return res.status(422).json({
            message: "Email already exists",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
              });
              user
                .save()
                .then((result) => {
                  console.log(result);
                  res.render('register',{
                    msg: 'success'
                })
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      });
    
})