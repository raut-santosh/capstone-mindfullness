const User = require('../models/user.model')
const Ngo = require('../models/ngo.model')
const Blog = require('../models/blog.model')
const GetAStart = require('../models/getstart.model')
const Professionals = require('../models/professionals.model') 
const File = require('../models/file.model')
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
    return res.render('admin/dashboard')
}

exports.blog_addedit = async (req, res) => {
    console.log('req body: ',req.body)
    if(req.method == 'GET'){
        if(!req.query.id){
            console.log('GET: blog_adddit without id')
            return res.render('admin/blog_addedit')
        }else{
            console.log('GET: blog_adddit with id')
            let blog = await Blog.findOne({_id: req.query.id})
            let file = await File.findOne({_id: blog.file._id})
            let data = {
                id: blog._id,
                title: blog.title,
                description: blog.description,
                tagline: blog.tagline,
                filename: file.name,
                filepath: file.path,
                fileid: file._id
            }
            // console.log(data)
            return res.render('admin/blog_addedit',{data})  
        }
    }else{
        if(req.body.id){
            if(req.file){
                console.log('POST: blog_adddit with id with file')
                console.log('got new file')
                let file = new File(
                    {
                        name: req.file.originalname, 
                        filename: req.file.filename, 
                        type: req.file.mimetype, 
                        path: req.file.path
                    }
                )
                file.save();
                let f = await File.findOne({_id: file._id});
                let data = {
                    title: req.body.title,
                    description: req.body.description,
                    tagline: req.body.tagline,
                    filename: file.name,
                    filepath: file.path,
                    fileid: file._id,
                    id: req.body.id
                }
                await Blog.findOneAndUpdate({_id: req.body.id}, {
                    title: req.body.title,
                    description: req.body.description,
                    tagline: req.body.tagline,
                    file: file._id
                })
                return res.render('admin/blog_addedit',{data})
            }else{
                console.log('POST: blog_addedit with id without file')
                let blog = await Blog.findOneAndUpdate({_id: req.body.id}, {
                    title: req.body.title,
                    description: req.body.description,
                    tagline: req.body.tagline,
                    file: req.body.fileid
                })

                let file = await File.findOne({_id: req.body.fileid})
                let data = {
                    id: req.body.id,
                    title: req.body.title,
                    description: req.body.description,
                    tagline: req.body.tagline,
                    filename: file.name,
                    filepath: file.path,
                    fileid: file._id
                }
                return res.render('admin/blog_addedit', {data})
            }
             
        }else{
            console.log('POST: blog_addedit without id')
            let file = new File(
                {
                    name: req.file.originalname, 
                    filename: req.file.filename, 
                    type: req.file.mimetype, 
                    path: req.file.path
                }
            )
            file.save();
            let fileId =  file._id.toString();  
            console.log(fileId)
            let blog = new Blog({
                title: req.body.title,
                description: req.body.description,
                tagline: req.body.tagline,
                fileid: fileId,
                file: file
            })
            console.log(blog)
            blog.save();
            let b = {
                id: blog.id,
                title: blog.title,
                description: blog.description,
                tagline: req.body.tagline,
                filename: file.name,
                filepath: file.path,
                fileid: file._id
            }
            return res.render('admin/blog_addedit',{data:b})
        }
    }
    
}

exports.blog_list = async (req, res) => {
    if(req.method == 'GET'){
        Blog.find({}).then((list) => {
            return res.render('admin/blog_list',{ list })
        })
    }
}

exports.professionals_addedit = async (req, res) => {
    console.log('req body: ',req.body)
    if(req.method == 'GET'){
        if(!req.query.id){
            console.log('GET: professionals_adddit without id')
            return res.render('admin/professionals_addedit')
        }else{
            console.log('GET: professionals_adddit with id')
            let professionals = await Professionals.findOne({_id: req.query.id})
            let file = await File.findOne({_id: professionals.file._id})
            let data = {
                id: professionals._id,
                title: professionals.title,
                description: professionals.description,
                tagline: professionals.tagline,
                position: professionals.position,
                filename: file.name,
                filepath: file.path,
                fileid: file._id
            }
            // console.log(data)
            return res.render('admin/professionals_addedit',{data})  
        }
    }else{
        if(req.body.id){
            if(req.file){
                console.log('POST: professionals_adddit with id with file')
                console.log('got new file')
                let file = new File(
                    {
                        name: req.file.originalname, 
                        filename: req.file.filename, 
                        type: req.file.mimetype, 
                        path: req.file.path
                    }
                )
                file.save();
                let f = await File.findOne({_id: file._id});
                let data = {
                    title: req.body.title,
                    description: req.body.description,
                    tagline: req.body.tagline,
                    position: req.body.position,
                    filename: file.name,
                    filepath: file.path,
                    fileid: file._id,
                    id: req.body.id
                }
                await Professionals.findOneAndUpdate({_id: req.body.id}, {
                    title: req.body.title,
                    description: req.body.description,
                    position: req.body.position,
                    tagline: req.body.tagline,
                    file: file._id
                })
               return res.render('admin/professionals_addedit',{data})
            }else{
                console.log('POST: professionals_addedit with id without file')
                let professionals = await Professionals.findOneAndUpdate({_id: req.body.id}, {
                    title: req.body.title,
                    description: req.body.description,
                    position: req.body.position,
                    tagline: req.body.tagline,
                    file: req.body.fileid
                })

                let file = await File.findOne({_id: req.body.fileid})
                let data = {
                    id: req.body.id,
                    title: req.body.title,
                    description: req.body.description,
                    position: req.body.position,
                    tagline: req.body.tagline,
                    filename: file.name,
                    filepath: file.path,
                    fileid: file._id
                }
                return res.render('admin/professionals_addedit', {data})
            }
             
        }else{
            console.log('POST: professionals_addedit without id')
            let file = new File(
                {
                    name: req.file.originalname, 
                    filename: req.file.filename, 
                    type: req.file.mimetype, 
                    path: req.file.path
                }
            )
            file.save();
            let fileId =  file._id.toString();  
            console.log(fileId)
            let professionals = new Professionals({
                title: req.body.title,
                description: req.body.description,
                position: req.body.position,
                tagline: req.body.tagline,
                fileid: fileId,
                file: file
            })
            professionals.save();
            let b = {
                id: professionals.id,
                title: professionals.title,
                description: professionals.description,
                position: professionals.position,
                tagline: professionals.tagline,
                filename: file.name,
                filepath: file.path,
                fileid: file._id
            }
            return res.render('admin/professionals_addedit',{data:b})
        }
    }
}

exports.professionals_list = async (req, res) => {
    if(req.method == 'GET'){
        Professionals.find({}).then((list) => {
            return res.render('admin/professionals_list',{ list })
        })
    }
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
                return res.render('admin/getastart', {data})
            }else{
               return res.render('admin/getastart')
            }
            
        })
        console.log('get without id')
        return res.render('admin/getastart')
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
                return res.render('admin/getastart',{data})
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
                return res.render('admin/getastart', {data})
            })
        }
    }
}

exports.ngo_addedit = async (req, res) => {
    console.log('req body: ',req.body)
    if(req.method == 'GET'){
        if(!req.query.id){
            console.log('GET: ngo_adddit without id')
            return res.render('admin/ngo_addedit')
        }else{
            console.log('GET: ngo_adddit with id')
            let ngo = await Ngo.findOne({_id: req.query.id})
            let file = await File.findOne({_id: ngo.file._id})
            let data = {
                id: ngo._id,
                title: ngo.title,
                description: ngo.description,
                tagline: ngo.tagline,
                position: ngo.position,
                filename: file.name,
                filepath: file.path,
                fileid: file._id
            }
            // console.log(data)
            return res.render('admin/ngo_addedit',{data})  
        }
    }else{
        if(req.body.id){
            if(req.file){
                console.log('POST: ngo_adddit with id with file')
                console.log('got new file')
                let file = new File(
                    {
                        name: req.file.originalname, 
                        filename: req.file.filename, 
                        type: req.file.mimetype, 
                        path: req.file.path
                    }
                )
                file.save();
                let f = await File.findOne({_id: file._id});
                let data = {
                    title: req.body.title,
                    description: req.body.description,
                    tagline: req.body.tagline,
                    position: req.body.position,
                    filename: file.name,
                    filepath: file.path,
                    fileid: file._id,
                    id: req.body.id
                }
                await Ngo.findOneAndUpdate({_id: req.body.id}, {
                    title: req.body.title,
                    description: req.body.description,
                    position: req.body.position,
                    tagline: req.body.tagline,
                    file: file._id
                })
                return res.render('admin/ngo_addedit',{data})
            }else{
                console.log('POST: ngo_addedit with id without file')
                let ngo = await Ngo.findOneAndUpdate({_id: req.body.id}, {
                    title: req.body.title,
                    description: req.body.description,
                    position: req.body.position,
                    tagline: req.body.tagline,
                    file: req.body.fileid
                })

                let file = await File.findOne({_id: req.body.fileid})
                let data = {
                    id: req.body.id,
                    title: req.body.title,
                    description: req.body.description,
                    position: req.body.position,
                    tagline: req.body.tagline,
                    filename: file.name,
                    filepath: file.path,
                    fileid: file._id
                }
                return res.render('admin/ngo_addedit', {data})
            }
             
        }else{
            console.log('POST: ngo_addedit without id')
            let file = new File(
                {
                    name: req.file.originalname, 
                    filename: req.file.filename, 
                    type: req.file.mimetype, 
                    path: req.file.path
                }
            )
            file.save();
            let fileId =  file._id.toString();  
            console.log(fileId)
            let ngo = new Ngo({
                title: req.body.title,
                description: req.body.description,
                position: req.body.position,
                tagline: req.body.tagline,
                fileid: fileId,
                file: file
            })
            console.log(ngo)
            ngo.save();
            let b = {
                id: ngo.id,
                title: ngo.title,
                description: ngo.description,
                position: ngo.position,
                tagline: ngo.tagline,
                filename: file.name,
                filepath: file.path,
                fileid: file._id
            }
            return res.render('admin/ngo_addedit',{data:b})
        }
    }
}

exports.ngo_list = async (req, res) => {
    if(req.method == 'GET'){
        await Ngo.find({}).then((list) => {
            return res.render('admin/ngo_list',{ list })
        })
    }
}