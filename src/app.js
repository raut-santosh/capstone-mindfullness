const path = require('path')
const express = require('express')
const bcrypt = require('bcrypt')
const hbs = require('hbs')
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// const { error } = require('console')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

mongoose
  .connect(
    "mongodb+srv://sam:P2Q0wVEIuyDV9Nbp@cluster0.mglis6g.mongodb.net/capstone?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("connected to online database");
  })
  .catch((e) => {
    console.log("Error: ", e);
  });

  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/uploads", express.static("uploads"));

// creating port so that app can be used with heroku and if app is localy used logical or will provide 3000 to port variable
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
// handlebars (hbs) setup in express seting viewengine to hbs 

// now we are renaming views folder so we can check another method
// another method for hbs views
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))


// using render
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'santosh'
    })
})

app.get('/register', (req, res) => {
    console.log(req.body)
    res.render('register', {
        title: 'About Me',
        name: 'santosh raut',
        age: 21
    })
})

app.post('/register', (req, res) => {
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

app.get('/login', (req, res) => {
    res.render('login')
})

app.post("/login", (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user.length < 1) {
          res.status(404).json({
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
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "1h",
                }
              );
            //   res.status(200).json({
            //     message: "Login successfully",
            //     token: token,
            //   });
            res.render('login')
            } else {
              res.status(401).json({
                message: "Wrong password",
              });
            }
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "User not exists",
        });
      });
  });

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'santosh raut',
        help: 'this is some help'
    })
})

app.get('/test',(req, res) => {
    res.send({
        title: 'santosh',
        post: 'king'
    })
})



// app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'santosh',
//         age: 22
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page route</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide adress'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })

    // console.log(req.query.address)
    // res.send({
    //     address: req.query.address,
    //     forecast: 'It is snowing',
    //     location: 'Phelidelphia'
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'santosh',
        name: 'raut',
        error: 'articles not found help'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Santosh Raut',
        error: 'page not found'
    })
})

// To start using app localy change port to run on lapy
// app.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })

module.exports = app