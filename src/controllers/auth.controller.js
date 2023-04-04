const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
    // console.log(req.body)
    if(req.method == 'GET'){
        res.render('register', {
            title: 'About Me',
            name: 'santosh raut',
            age: 21
        })
    }else{
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
                      res.render('login',{
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
    }
}


exports.login = (req, res) => {
    if(req.method == 'GET'){
        return res.render('login')
    }else{
        User.findOne({ email: req.body.email })
      .then((user) => {
        if (user.length < 1) {
          return res.status(404).json({
            message: "User doesn't exits",
          });
        } else {
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              res.status(500).json({
                error: err,
              });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user._id,
                  is_admin: user.is_admin
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "12h",
                }
              );
              res.cookie('token', token, { httpOnly: true });
            //   res.status(200).json({
            //     message: "Login successfully",
            //     token: token,
            //   });
            return res.redirect('/admin/dashboard')
            } else {
              return res.status(401).json({
                message: "Wrong password",
              });
            }
          });
        }
      })
      .catch(() => {
       return res.status(500).json({
          error: "User not exists",
        });
      });
    }
}