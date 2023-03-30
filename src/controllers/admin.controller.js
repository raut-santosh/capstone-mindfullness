const User = require('../models/user.model')

exports.dashboard = (req, res) => {
    // console.log(req.userData)
    if(req.userData){
        User.findOne({_id: req.userData._id}).then((result) => {
            console.log(result)
        }).catch((e) => {
            console.log(e)
        })
    }
    res.render('admin/dashboard')
}

exports.blog = (req, res) => {
    res.render('admin/blog', {
        apiKey: ''
    })
}

exports.ngo = (req, res) => {
    res.render('admin/ngo')
}

exports.professionals = (req, res) => {
    res.render('admin/professionals')
}

exports.getastart = (req, res) => {
    res.render('admin/getastart')
}