const path = require('path')
const express = require('express')
const bcrypt = require('bcrypt')
const hbs = require('hbs')
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

require('dotenv').config()
const checkAuth = require('./middleware/check-auth')
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

  app.use(cookieParser());
  // app.use(morgan("dev"));
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

require("./routes")(app);

// To start using app localy change port to run on lapy
// app.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })

module.exports = app