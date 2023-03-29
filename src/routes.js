const pagesController = require('./controllers/pages.controller')
const authController = require('./controllers/auth.controller')








module.exports = function (app) {

    app.get('', (req, res) => {
        res.redirect('home')
    })

    app.get('/register', authController.register)
    app.post('/register', authController.register)

    app.get('/login', authController.login)
    app.post('/login', authController.login)



    app.get('/home', pagesController.home)
    app.get('/about', pagesController.about)
    app.get('/contact', pagesController.contact)
    app.get('/portfolio-details', pagesController.portfolioDetails)
    app.get('/blog-details', pagesController.blogDetails)

}