exports.home = (req, res, next) => {
    res.render('index');
}

exports.about = (req, res) => {
    res.render('about');
}

exports.contact = (req, res) => {
    res.render('contact')
}

exports.blogDetails = (req, res) => {
    res.render('blog-details')
}

exports.portfolioDetails = (req, res) => {
    res.render('portfolio-details')
}

exports.errorPage = (req, res) => {
    res.render('404')
}