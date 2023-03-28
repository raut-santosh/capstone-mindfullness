const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });


app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

// using render
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'santosh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'santosh raut',
        age: 21
    })
})

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

// to handle all request which are not above
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  // for our errors (middleware by docs express)
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
  

// To start using app localy change port to run on lapy
// app.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})