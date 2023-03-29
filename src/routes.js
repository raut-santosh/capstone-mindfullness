const pagesController = require('./controllers/pages.controller')
const authController = require('./controllers/auth.controller')
const checkAuth = require('./middleware/check-auth')







module.exports = function (app) {

    app.get('', (req, res) => {
        res.redirect('home')
    })

    app.get('/register', authController.register)
    app.post('/register', authController.register)

    app.get('/login', authController.login)
    app.post('/login', authController.login)



    app.get('/home', checkAuth, pagesController.home)
    app.get('/about', checkAuth, pagesController.about)
    app.get('/contact', checkAuth, pagesController.contact)
    app.get('/portfolio-details', checkAuth, pagesController.portfolioDetails)
    app.get('/blog-details', checkAuth, pagesController.blogDetails)

}