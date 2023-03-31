const pagesController = require('./controllers/pages.controller')
const authController = require('./controllers/auth.controller')
const adminController = require('./controllers/admin.controller')
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

    app.get('/admin',checkAuth, (req, res) => {
        res.redirect('/admin/dashboard')
    })
    app.get('/admin/dashboard', checkAuth, adminController.dashboard)
    app.get('/admin/blog', checkAuth, adminController.blog)
    app.get('/admin/ngo', checkAuth, adminController.ngo)
    app.post('/admin/ngo', checkAuth, adminController.ngo)
    app.get('/admin/professionals', checkAuth, adminController.professionals)
    app.get('/admin/getastart', checkAuth, adminController.getastart)

}