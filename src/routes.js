const pagesController = require('./controllers/pages.controller')
const authController = require('./controllers/auth.controller')
const adminController = require('./controllers/admin.controller')
const checkAuth = require('./middleware/check-auth')
const {upload} = require('./middleware/helper')


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
    app.get('/ngo-details', checkAuth, pagesController.ngoDetails)
    app.get('/blog-details', checkAuth, pagesController.blogDetails)

    app.get('/admin',checkAuth, (req, res) => {
        res.redirect('/admin/dashboard')
    })
    app.get('/admin/dashboard', checkAuth, adminController.dashboard)

    app.get('/admin/blog_list', checkAuth, adminController.blog_list)
    app.get('/admin/blog_addedit', checkAuth, upload.single('image'), adminController.blog_addedit)
    app.get('/admin/blog_addedit/:id', checkAuth, upload.single('image'), adminController.blog_addedit)
    app.post('/admin/blog_addedit', checkAuth, upload.single('image'), adminController.blog_addedit)
    app.post('/admin/blog_addedit/:id', checkAuth, upload.single('image'), adminController.blog_addedit)


    app.get('/admin/professionals_list', checkAuth, adminController.professionals_list)
    app.get('/admin/professionals_addedit', checkAuth, upload.single('image'), adminController.professionals_addedit)
    app.get('/admin/professionals_addedit/:id', checkAuth, upload.single('image'), adminController.professionals_addedit)
    app.post('/admin/professionals_addedit', checkAuth, upload.single('image'), adminController.professionals_addedit)
    app.post('/admin/professionals_addedit/:id', checkAuth, upload.single('image'), adminController.professionals_addedit)

    app.get('/admin/ngo_list', checkAuth, adminController.ngo_list)
    app.get('/admin/ngo_addedit', checkAuth, upload.single('image'), adminController.ngo_addedit)
    app.get('/admin/ngo_addedit/:id', checkAuth, upload.single('image'), adminController.ngo_addedit)
    app.post('/admin/ngo_addedit', checkAuth, upload.single('image'), adminController.ngo_addedit)
    app.post('/admin/ngo_addedit/:id', checkAuth, upload.single('image'), adminController.ngo_addedit)


    app.get('/admin/getastart', checkAuth, adminController.getastart)
    app.get('/admin/getastart/:id', checkAuth, adminController.getastart)
    app.post('/admin/getastart', checkAuth, adminController.getastart)
    app.post('/admin/getastart/:id', checkAuth, adminController.getastart)

}