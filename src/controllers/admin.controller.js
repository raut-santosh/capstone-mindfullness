const User = require('../models/user.model')
const NGO = require('../models/ngo.model')
const Blog = require('../models/blog.model')
const GetAStart = require('../models/getstart.model')
const Professionals = require('../models/professionals.model') 


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
    if(req.method == 'GET'){
        res.render('admin/blog')
    }else{
        console.log(req.body)
        const blog = new Blog({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
        })
        blog.save().then((data) => {
            // console.log(data)
            res.render('admin/ngo', {
                data: JSON.stringify(data)
            })
        })
    }
    
}

exports.ngo = async (req, res) => {
    if(req.method == 'GET'){
        res.render('admin/ngo',{
            data: {
                title: 'sam the don',
                description: 'description of sam',
                items: {
                    item_title: 'itemtitle',
                    item_sub_title: 'items title sub',
                    item_content: 'i am content',
                }
            }
        })
    }else{
        console.log(req.body)
        const ngo = new NGO({
            title: req.body.title,
            description: req.body.description,
            items: {
                item_title: req.body.item_title,
                item_sub_title: req.body.item_sub_title,
                item_content: req.body.item_content,
            }
        })
        ngo.save().then((data) => {
            // console.log(data)
            res.render('admin/ngo', {
                data: JSON.stringify(data)
            })
        })
    }
}

exports.professionals = (req, res) => {
    res.render('admin/professionals')
}

exports.getastart = (req, res) => {
    res.render('admin/getastart')
}