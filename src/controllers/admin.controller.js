const User = require('../models/user.model')
const NGO = require('../models/ngo.model')
const Blog = require('../models/blog.model')
const GetAStart = require('../models/getstart.model')
const Professionals = require('../models/professionals.model') 
const path = require('path')
const multer = require('multer')

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

exports.blog_addedit = async (req, res) => {
    console.log(req.file)
    if(req.method == 'GET'){
        if(!req.query.id){
            res.render('admin/blog_addedit')
        }else{
            Blog.findOne({_id: req.query.id}).then((data) => {
                res.render('admin/blog_addedit',{data})
            })
        }
    }else{
        if(req.query.id){
            let blog = await Blog.findOne({_id: req.query.id});
            let data = new Blog({
                id: blog._id,
                title: blog.title,
                file: blog.file,
                description: blog.description
            })
            data.save().then((data)=>{
                res.render('admin/blog_addedit',{data})
            })
        }
        let file = {name: req.file.orignalname, filename: req.file.filename, type: req.file.type, path: req.file.path}
        let blog = new Blog({
            title: req.body.title,
            description: req.body.description,
            file: file
        })
        blog.save().then((data) => {
            // console.log(data)
            res.render('admin/blog_addedit', {
                data: {
                    id: data._id,
                    title: data.title,
                    description: data.description,
                    file: data.file
                }
            })
        })
    }
    
}

exports.blog_list = async (req, res) => {
    if(req.method == 'GET'){
        Blog.find({}).then((list) => {
            res.render('admin/blog_list',{ list })
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

exports.getastart = async (req, res) => {
    console.log('body',req.body)
    if(req.method == 'GET'){
        await GetAStart.findOne({}).then((data) => {
            if(data){
                console.log('Get data id')
                let i_data = {}
                let i = 0;
                data?.items.forEach(item => {
                    for(let key in item){
                    i_data[key+'_'+i] = item[key];
                    }
                    i++;
                });
                data = {
                    id: data._id.toString(),
                    title: data.title,
                    description: data.description,
                    ...i_data,
                }
                console.log('data',data)
                res.render('admin/getastart', {data})
            }else{
                res.render('admin/getastart')
            }
            
        })
        console.log('get without id')
        res.render('admin/getastart')
    }else{
        if(req.body.id){
            console.log('post with id')
            let getastart = await GetAStart.findOne({_id: req.body.id});
            let items = [];

            for (let i = 0; i < req.body.item_name.length; i++) {
                let item = {
                    item_name: req.body.item_name[i],
                    item_count: req.body.item_count[i],
                    item_content: req.body.item_content[i]
                };
                items.push(item);
            }
            await GetAStart.findOneAndUpdate({_id: getastart._id}, {
                title: req.body.title,
                description: req.body.description,
                items:items
            }).then((data)=>{
                let i_data = {}
                let i = 0;
                data.items.forEach(item => {
                    for(let key in item){
                    i_data[key+'_'+i] = item[key];
                    }
                    i++;
                });
                data = {
                    id: data._id,
                    title: data.title,
                    description: data.description,
                    ...i_data,
                }
                res.render('admin/getastart',{data})
            })
        }else{
            console.log('post without id')
            let items = [];

            for (let i = 0; i < req.body.item_name.length; i++) {
                let item = {
                    item_name: req.body.item_name[i],
                    item_count: req.body.item_count[i],
                    item_content: req.body.item_content[i]
                };
                items.push(item);
            }

            let getastart = new GetAStart({
                title: req.body.title,
                description: req.body.description,
                items: items
            })
            getastart.save().then((data) => {
                let i_data = {}
                let i = 0;
                items.forEach(item => {
                    for(let key in item){
                    i_data[key+'_'+i] = item[key];
                    }
                    i++;
                });
                data = {
                    id: data._id.toString(),
                    title: data.title,
                    description: data.description,
                    ...i_data,
                }
                console.log(data)
                res.render('admin/getastart', {data})
            })
        }
    }
}